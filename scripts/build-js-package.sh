#!/bin/bash
# Copyright 2023 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# =============================================================================

# Exit the script on any command with non 0 return code
set -e

mkdir -p dist/
cp -f src/visualblocks.d.ts lib/visualblocks.js dist/

# Patch visualblocks.js so that it can create a default "<base>" tag if the
# hosting page doesn't have one. This is required for the lib to run correctly.
cat src/visualblocks_js_patch >> dist/visualblocks.js
