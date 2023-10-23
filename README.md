# Combo test

### Stack

- Vite as development environment
- Components from (https://react-spectrum.adobe.com/react-spectrum/getting-started.html)[Adobe Spectrum] as UI library with accessibility.
- useAsyncList hook for loading external data with loading state, pagination, etc. if some day needs some caching, maybe it's better change to react-query or implement some api with this hook
- styling from tailwindcss, for me it's a no-brainer solution for styling, depending complexity of project can use tailwindui for rapid development.
- for sharing state between components I used context for simple solution. if need some thing a solution with more robustness, I choose zustand since it's scalable and simple to build shared state, keeping growning.


### Architeture

- I decided to mix using context + OOP approach. keeping business rules on entities classes.
- For load data I decided to create a service class for that.
- to calculate the nearest places from the current place I decided to use the `haversine-distance` algorithm (AKA The great circle distance)

## Patterns 

- Prettier for code format
- EditorConfig for default spaces, encoding, etc. 
- Eslint


### Preview

https://combo-tests.netlify.app/
