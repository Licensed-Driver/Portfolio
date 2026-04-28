# VRticulate

Free, open-source full-body motion capture using webcams. The goal of this project is to give VRChat users expressive full-body tracking without hardware trackers, with OSC as the intended output protocol.

---

## How it works

The system is split into a Python backend and a Unity frontend. The backend does all the heavy lifting: it runs pose inference, handles multi-camera geometry, and streams results over a local network. Unity receives the joint data and drives a skeleton in real time.

**Backend (Python)**

Each camera gets its own `CameraNode` thread. Every node runs Google MediaPipe's `PoseLandmarker` on its video feed and posts landmarks to a shared `FetchPool`; a custom synchronization primitive that maintains a thread-safe fixed broadcast/collect cycle across any number of threads without busy-waiting.

The `CameraManager` aggregates results each cycle and reconstructs a world-space skeleton using one of two modes:

- **Average** - Light-weight and\or single-camera path. Solely applies the transform from ArUco calibration to go from camera-space to world-space. This is done per-camera, and the estimated pose is averaged accross all cameras. This mode is fast and works with one camera, but Z-depth inference is fairly limited. If average is being used with multiple cameras, all must be calibrated with a shared ArUco marker.
- **Triangulate** - Heavier multi-camera path. Uses a direct linear transform (DLT) across all calibrated cameras, solved with singular value decomposition (SVD), to triangulate each joint in true 3D space. Triangulation requires two or more cameras, calibrated with a shared ArUco markers for calibration.

If the user measures their bone-lengths, the lengths of the bones are enforced every frame after pose construction. During a calibration pose, the system measures each limb segment. From then on, every joint position is adjusted so limb lengths stay physically consistent, which significantly cuts down on the floating and stretching that raw landmark data tends to produce.

A `CommunicationManager` sits on top and handles all IPC with Unity over UDP, including a command parser that lets the frontend control model selection, camera assignment, calibration, and tracking state without restarting the process or concerning itself with thread semantics.

**Frontend (Unity / C#)**

`UDPTrackingReceiver` launches the backend executable as a subprocess on startup and waits for its `READY` signal before sending configuration. Incoming joint packets are pushed onto a `ConcurrentStack` so the main thread always reads the freshest frame and never falls behind. A One Euro Filter is applied per-joint to smooth out high-frequency jitter while keeping large, intentional movements responsive. A TCP stream runs in parallel for a live camera preview inside Unity.

---

## Stack

| Layer              | Technology                                            |
| ------------------ | ----------------------------------------------------- |
| Pose inference     | Google MediaPipe PoseLandmarker (Lite / Full / Heavy) |
| Camera calibration | OpenCV ArUco markers + solvePnP                       |
| Multi-camera 3D    | SVD-based DLT triangulation (N-camera)                |
| Backend            | Python 3 as a standalone .exe using PyInstaller       |
| Frontend           | Unity (C#), Newtonsoft.Json                           |
| IPC                | UDP (control + tracking data), TCP (video preview)    |
| Smoothing          | One Euro Filter                                       |

---

## Requirements

- Python 3.10+ (for development; end users run the compiled exe)
- One or more webcams
- An ArUco marker with clear white borders for camera calibration (4x4, ID 0); physical side length in meters must be entered in Unity
- Unity 2022.3 LTS or newer

Python dependencies:

```
opencv-python
mediapipe
numpy
```

---

## Setup

**Backend (development)**

```bash
cd Backend
pip install -r requirements.txt
# using system camera indices
python tracker.py --cameras 0        # single camera
python tracker.py --cameras 0 1      # two cameras
```

MediaPipe model files go in `Backend/assets/models/`. Three variants are supported: `pose_landmarker_lite.task`, `pose_landmarker_full.task`, and `pose_landmarker_heavy.task`. Download them from the MediaPipe model cards page if needed.

**Backend (compiled)**

```bash
pyinstaller --onedir tracker.py
```

The Unity frontend expects the exe at `../Backend/dist/tracker.exe` relative to the Unity project directory.

**Frontend**

Open the `Frontend/` directory in Unity. Assign the skeleton root to `UDPTrackingReceiver.targetObject` in the Inspector. Set `CameraIndices`, `Model`, and `MarkerSizeMeters` to match your physical setup, then hit Play.

---

## Calibration

1. Place an ArUco marker flat on the floor in view of all cameras (This will be the center of your space)
2. Enter the marker's side length in meters in the Unity Inspector
3. Click **Calibrate** - each camera node detects the marker and computes its transformation matrix
4. Stand in a T-pose and click **Calibrate Bones** - there is a 5-second countdown, then the system measures all limb segments

Triangulation mode requires at least two cameras to have completed step 3.

---

## Status

The core tracking pipeline is functional: multi-camera capture, world-space reconstruction, bone-length enforcement, and Unity visualization all work end-to-end. OSC outputk, VRChat avatar integration, and general polish are still in development.

Known rough edges:

- Z-depth in single-camera average mode is inferred, not measured — noticeable on lateral movements
- Calibration assumes a flat floor plane
- No automatic camera reconnection if a device disconnects mid-session
- Recent architecture overhaul in backend resulted in much more performant scalable solution, but introduced small jitters that still need squashing.
