# example-merchant-list-web-app
An example of application that displays associated devices with a specified merchant.

[Run Demo](https://gamliela.github.io/example-merchant-list-web-app/)

[Run Demo (Mock Data)](https://gamliela.github.io/example-merchant-list-web-app/?useMockData=true)
 
### Technology Stack
TypeScript, React, MobX, SCSS, CSS Modules, Webpack, React Toolbox (+ Material Design icons).

Components state is managed entirely in MobX.

### Features
1. Data is fetched dynamically from hardcoded apis.
2. Alternatively, data is taken from code when adding `useMockData=true` to the app URL.
2. Spinner is shown while data is loaded (for both real and mock data).
3. Mobile first: one list view and responsive design.
4. Expandable devices list.
5. Search as-you-type.
6. Sortable by various device properties.
7. Multi-tabs panel.
8. Shows error bar on network failures.

### Assumptions
1. `Promise` object is natively supported by browser.
2. `window.fetch` function is natively supported by browser.
