# Contract Viewer Takehome Assessment

## Project Overview

This solution demonstrates two approaches for rendering legal contract clauses from JSON:

1. **Main Branch**  
   Initial specific implementation tailored to the sample JSON structure

   - Quick solution for the given input format
   - Basic clause numbering implementation

2. **General Solution Branch**  
   Refined implementation with generic clause handling
   - DFS-based numbering system
   - Context-aware level tracking
   - Support for arbitrary nesting depth
   - Proper numbering reset at each hierarchy level

## Development Journey

- **Initial Approach (3hr timeframe):**  
  tried to build a genreal solution but failed to handle nested clauses fully correctly (always get 1,2,(a,b),but then 1 instead of 3)
  so then Built a JSON-specific parser with simple counter logic

- **Post-Submission Refinement:**  
   Fix the above issues
