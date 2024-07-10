class ErrorHandler {
  execute(error) {
    throw new Error('Method not implemented');
  }
}

class TypeErrorHandler extends ErrorHandler {
  execute(error) {
    if (error instanceof TypeError) {
      console.error('TypeError handled:', error.message);
      // Example fix: Ensure the correct type is used
      if (error.message.includes('undefined')) {
        console.error('Attempting to access property of undefined. Please check if the object is initialized.');
      }
    } else {
      super.execute(error); // Call base method if not handled
    }
  }
}

class ReferenceErrorHandler extends ErrorHandler {
  execute(error) {
    if (error instanceof ReferenceError) {
      console.error('ReferenceError handled:', error.message);
      // Example fix: Provide a fallback value or define the missing variable
      console.error('This variable might not be defined. Ensure all variables are properly declared and initialized.');
    } else {
      super.execute(error);
    }
  }
}

class SyntaxErrorHandler extends ErrorHandler {
  execute(error) {
    if (error instanceof SyntaxError) {
      console.error('SyntaxError handled:', error.message);
      // Example fix: Provide a suggestion to check syntax
      console.error('Please check your syntax and ensure all expressions are correctly formed.');
    } else {
      super.execute(error);
    }
  }
}

class ErrorInvoker {
  constructor() {
    this.handlers = new Map();
  }

  addHandler(errorType, handler) {
    this.handlers.set(errorType, handler);
  }

  handle(error) {
    const handler = this.handlers.get(error.constructor);
    if (handler) {
      handler.execute(error);
    } else {
      console.error('Unhandled error:', error.message);
    }
  }
}

const invoker = new ErrorInvoker();
invoker.addHandler(TypeError, new TypeErrorHandler());
invoker.addHandler(ReferenceError, new ReferenceErrorHandler());
invoker.addHandler(SyntaxError, new SyntaxErrorHandler()); // Add new handler here

// Example of a TypeError: trying to call a method on an undefined variable
try {
  let obj;
  obj.someMethod(); // This will throw a TypeError
} catch (error) {
  invoker.handle(error);
}

// Example of a ReferenceError: using a variable that is not declared
try {
  console.log(nonExistentVariable); // This will throw a ReferenceError
} catch (error) {
  invoker.handle(error);
}

// Example of a SyntaxError: invalid JavaScript code
try {
  eval('foo bar'); // This will throw a SyntaxError
} catch (error) {
  invoker.handle(error);
}
