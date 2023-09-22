# Visual Blocks client library

This library allows you to create a Visual Blocks viewer inside your application
and load a specific pipeline.

## Setup

### npm

Add the following dependency to the `package.json` file:

```
"visualblocks": "0.0.1"
```

### Script tag

Add the following script tag to the `index.html` file:

```html
<script src="https://cdn.jsdelivr.net/npm/visualblocks/visualblocks.js"></script>
```

## How to use

* Create a Visual Blocks instance.

   ```typescript
   // Not needed when using script tag.
   import 'visualblocks'

   // Create an instance inside the given container with a project json url.
   const vbInstance = await visualblocks.create('.vb-container', {
     projectJsonUrl: PROJECT_JSON_URL,
   });
   ```

* Load project on the fly.

   ```typescript
   vbInstance.loadProjectFromJsonUrl(ANOTHER_PROJECT_URL);
   ```

* Get the current project json.

   ```typescript
    vbInstance.curProject$.subscribe(curProject => {
      console.log('Current project', curProject);
    });
   ```

## Demo

Check out the [live demo](https://storage.googleapis.com/tfweb/vblib-demos/demo1-basic/index.html), and see its source code [here](../demo1/).
