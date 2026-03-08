# Parallel Sorting by Regular Sampling (PSRS)

A multi-threaded C++ implementation of the Parallel Sorting by Regular Sampling (PSRS) algorithm using POSIX threads (`pthreads`). This project explores true concurrent execution for large-scale data sorting and includes an automated Python benchmarking suite to measure speedup and performance against standard sequential sorting methods.

## Table of Contents
- [Features](#features)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Building and Running](#building-and-running)
- [Benchmarking](#benchmarking)

## Features

- **Concurrent Execution:** Uese `pthreads` for thread management and `pthread_barrier` for synchronization across sorting phases.
- **Automated Benchmarking:** Contains a Python script (`run_experiment.py`) to automatically execute the compiled C++ binary across different memory sizes and thread counts.
- **Customizable Execution:** Command-line arguments allow for configuration of thread count, array size, random seed, and multiple validation runs.
- **Data Collection:** Benchmark results are parsed and saved to a CSV file, allowing for direct reporting on speedup and phase distribution.

## Project Architecture

```plaintext
.
├── Makefile               # Build configuration
├── run_experiment.py      # Python benchmarking execution script
├── experiment_data/       # Output directory for benchmark CSV results
├── report/                # Directory for experimentation reports
└── src/                   # C++ source code
    ├── headers/           # Class definitions and declarations
    ├── main.cpp           # Entry point and CLI parsing
    ├── psrs.cpp           # Main PSRS algorithm and threading logic
    └── tests.cpp          # Testing and array validation utils
```

## Prerequisites

- **C++ Compiler:** GCC with `C++20` support
- **POSIX API:** Specifically `pthreads` (should be standard on Linux/macOS, and available via WSL on Windows)
- **Python 3:** Required for running the automated benchmarking suite

## Building and Running

The project includes a `Makefile` to simplify building the source.

To compile the `psrs` executable:
```bash
make
```

To run a quick test (1,000,000 elements, 8 threads as default):
```bash
make test
```

To manually run the binary with custom settings:
```bash
./psrs <number_of_elements> <number_of_threads> [options]
```
**Options:**
- `-s, --seed <int>`: Set a specific random seed for array generation
- `-r, --runs <int>`: Specify the number of times to run the test
- `-a, --average <int>`: Calculate the average execution time over the last N runs
- `-q, --quicksort`: Run the sequential QuickSort baseline instead of PSRS

## Benchmarking

To execute the full benchmarking suite:
```bash
make experiment
```

This compiles the project and runs `run_experiment.py`. The suite compares QuickSort against the multi-threaded PSRS running with 1, 2, 4, 8, and 16 threads, over array sizes ranging from 1M to 100M elements. 

Results are scraped from stdout and exported to `experiment_data/experiment_results.csv`, including total execution time, durations for each of the three PSRS implementation phases, and the calculated speedup.
