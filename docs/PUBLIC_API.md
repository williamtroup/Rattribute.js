# Reattribute.js - Public API:

## `start()`

Starts the automation.

### Returns
- {Object} The Rattribute.js class instance.

## `stop()`

Stops the automation.

### Returns
- {Object} The Rattribute.js class instance.

## `fetch()`

Fetches all new elements added to the DOM and sets them up.

### Returns
- {Object} The Rattribute.js class instance.

## `refresh()`

Refreshes all the elements.

### Returns
- {Object} The Rattribute.js class instance.

## `getElements()`

Gets all the elements setup.

### Returns
- {Object[]} The array of elements.

## `getIgnoredElements()`

Gets all the ignored elements.

### Returns
- {Object[]} The array of ignored elements.

## `enableIgnoredElements()`

Enables all the ignored elements.

### Returns
- {Object} The Rattribute.js class instance.

## `setConfiguration()`

Sets the specific configuration options that should be used.

### Parameters
- {Object} configurationOptions - All the configuration options that should be set (refer to "Configuration Options" documentation for properties).

### Returns
- {Object} The Rattribute.js class instance.

## `getVersion()`

Returns the version of Rattribute.js.

### Returns
- {string} The version number.