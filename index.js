const every = require('./lib/every');
const waterfall =  require('./lib/waterfall');
const parallel = require('./lib/parallel');
const filter = require('./lib/filter');
const auto = require('./lib/auto')
const each = require('./lib/each');
const series = require('./lib/series');

module.exports = {
  auto:auto,
  filter:filter,
  parallel:parallel,
  waterfall:waterfall,
  every:every,
  each:each,
  series:series
}