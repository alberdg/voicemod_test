import React from 'react';

declare global {
  interface String {
    isEmpty() : boolean;
  }
}

String.prototype.isEmpty = function () {
  return !this || this.trim().length === 0
}
