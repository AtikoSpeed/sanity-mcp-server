# TODO

## High Priority
1. ✅ **Typescript Configuration and Errors**
   - ✅ Fix build errors in the schema.ts file
   - ✅ Fix other type errors found by typescript compiler
   - ⬜ Add stricter type checking and additional compiler options

2. ✅ **ESLint Issues**
   - ✅ Configure eslint to work consistently across the codebase
   - ✅ Refactor high complexity functions:
     - ✅ searchContent function in groq.ts
     - ✅ query function in groq.ts 
     - ✅ processPortableTextFields function in groq.ts
     - ✅ findReferences function in schema.ts
     - ✅ applyPatchOperations function in documentHelpers.ts

3. ✅ **Vitest Configuration**
   - ✅ Set up proper test runners for different test categories
   - ✅ Configure timeout settings appropriately for test types

4. 🔄 **Unit Test Improvements**
   - ✅ Fix test directory structure to ensure tests are properly discovered
     - ✅ Move `test/utils/sanityClient.test.ts` to `test/unit/utils/`
     - ✅ Document test directory structure standards rather than reorganizing existing tests
     - ✅ Update Vitest configurations to reflect the new test structure
     - ✅ Create guidelines for future test file organization:
       - ✅ Document naming conventions
       - ✅ Establish proper test file placement guidelines
       - ✅ Create examples of well-organized test files
   - ⬜ Add test coverage for controllers without sufficient tests
     - ⬜ Identify controllers with low test coverage
     - ⬜ Prioritize critical functionality for additional tests
     - ⬜ Implement missing tests for key controllers
   - ⬜ Implement tests for core utility functions
   - ⬜ Set up proper mocking for external dependencies

## Medium Priority
1. ⬜ **Integration Test Enhancements**
   - ⬜ Add standard integration tests for key user workflows
   - ⬜ Implement extended integration tests for edge cases
   - ⬜ Set up proper test fixtures and data generators

2. ⬜ **Documentation Improvements**
   - ⬜ Update API documentation with better JSDoc
   - ⬜ Create comprehensive getting started guide
   - ⬜ Add usage examples for key features

3. ⬜ **Performance Optimizations**
   - ⬜ Identify and optimize slow API routes
   - ⬜ Add caching for frequently accessed data
   - ⬜ Implement query optimizations

## Low Priority
1. ⬜ **Code Cleanup**
   - ⬜ Remove unused code and dependencies
   - ⬜ Standardize error handling patterns
   - ⬜ Refactor duplicate code into shared utilities

