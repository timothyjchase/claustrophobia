// withTracker(fn) will ignore its argument and return a function that just
// returns its own function/Component argument
module.exports = {
  withTracker: jest.fn().mockImplementation(fn => fn => fn),
}
