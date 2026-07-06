# Reattribute.js - Change Log:

## Version 1.3.1:
- Fixed a fault that prevented the elements from refreshing when removeAttributes is disabled.
- Minor internal renames to variables.
- Massively improved the number fetching for custom sizing attributes.
- Minor documentation changes to reflect more accepted names.
- Renamed config.ts to configuration.ts.
- Fixed a fault that would cause script errors to occur when attributes have not been set up correctly.


## Version 1.3.0:
- Arguments passed to functions in the attribute setters can now be any type of value (instead of only strings being supported).
- The "data-rattribute-js-ignore" attribute is now removed when set to false straight away (if removeAttributes is enabled).
- Added a new public API function called "getElements()", which will return all the elements currently set up.
- Added a new public API function called "getIgnoredElements()", which will return all the elements that have been configured to be ignored.
- Added a new public API function called "enableIgnoredElements()", which will enable all the elements set to ignore.
- Fixed documentation faults in the api.ts file.
- Fixed some missing types in the observation.ts file.
- Added documentation for the public API.
- Added documentation for the configuration settings.
- Added missing project settings, topics, and documentation files.


## Version 1.2.0:
- Added support to set attribute values directly from function call results!
- Improved the ignore check to use an actual boolean value.
- Added improved checks around the elements (in case they are removed from the DOM).
- Added a new configuration option called "assignMissingIds" (defaults to false), which will assign IDs to the elements that do not contain them.
- Added a new configuration option called "elementIdPrefix" (defaults to "rattribute"), which states the element ID prefix to use when "assignMissingIds" is enabled.