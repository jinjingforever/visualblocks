/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import '@visualblocks/runner';

import type {VisualBlocksInstance} from '@visualblocks/runner';

let vbInstance: VisualBlocksInstance|undefined = undefined;

// Load url for a laser hand pipeline when clicking the "load from json url"
// button.
document.querySelector(
            '#btn-load-from-json-url')!.addEventListener('click', () => {
  vbInstance?.loadProjectFromJsonUrl(
      'https://raw.githubusercontent.com/google/visualblocks/main/pipelines/laser_hands_rough/laser_hands_rough.json');
});

// Load json for a color pop pipeline when clicking the "load from json" button.
document.querySelector(
            '#btn-load-from-json')!.addEventListener('click', async () => {
  const json =
      await (
          await fetch(
              'https://raw.githubusercontent.com/google/visualblocks/main/pipelines/color_pop/color_pop.json'))
          .json();
  vbInstance?.loadProjectFromJson(json);
});

// Reset visual blocks when clicking the "reset" button.
document.querySelector('#btn-reset')!.addEventListener('click', () => {
  vbInstance?.reset();
});

async function start() {
  vbInstance = await visualblocks.create('.vb-container', {
    projectJsonUrl:
        'https://raw.githubusercontent.com/google/visualblocks/main/pipelines/silhouette_style_photo_generator/silhouette_style_photo_generator.json',
  });

  // Output the current project json to console.
  vbInstance!.curProject$.subscribe(curProject => {
    console.log('Current project', curProject);
  });
}

start();
