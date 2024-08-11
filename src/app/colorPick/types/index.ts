// This line of code is an ES6 module export statement.
// It re-exports all exports from the module located at './formItemTypes'.
// This allows other modules to import everything that is exported from './formItemTypes'
// directly from the module that contains this export statement.

// By using this syntax, we can aggregate exports from multiple modules 
// into a single module, making it easier to manage and import them elsewhere in the application.
export * from './formItemTypes';
export * from './validateTypes';