# Reattribute.js - Configuration:

The following configuration options are available when initializing or updating Rattribute.js.

| Option | Default | Description |
|--------|:-------:|-------------|
| `responsiveDelay` | `250` | Specifies the delay, in milliseconds, before Rattribute.js updates elements after the browser window is resized. |
| `removeAttributes` | `true` | Determines whether Rattribute.js removes its own attributes from elements after they have been processed. |
| `enabled` | `true` | Determines whether Rattribute.js starts with automation enabled. |
| `observationMode` | `true` | Enables DOM observation, allowing Rattribute.js to automatically detect and configure newly added elements. |
| `assignMissingIds` | `false` | Automatically assigns unique IDs to elements that do not already have one. |
| `elementIdPrefix` | `"rattribute"` | Specifies the prefix used when generating IDs for elements, provided `assignMissingIds` is enabled. |