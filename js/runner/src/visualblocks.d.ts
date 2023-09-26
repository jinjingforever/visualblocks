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

import {BehaviorSubject} from 'rxjs';

declare global {
  var visualblocks: VisualBlocksFactory;
}

/** The factory that creates an VisualBlocksInstance. */
export interface VisualBlocksFactory {
  /**
   * Creates an instance of Visual Blocks inside the given container.
   *
   * @param containerSelector the css selector for the container to put Visual
   *     Blocks viewer into.
   * @param config configrations. See `VisualBlocksConfig` below for more
   *     details.
   * @param root the root element to query the container from. Default is
   *     `document`.
   */
  create:
      (containerSelector: string, config?: VisualBlocksConfig,
       root?: HTMLElement|
       ShadowRoot) => Promise<VisualBlocksInstance|undefined>;
}

/** Configs for visual blocks component. */
export declare interface VisualBlocksConfig {
  /**
   * Project json url.
   *
   * If set, the page will be pre-loaded with the json fetched from this url.
   * It takes precedence over the `projectJson` field below if both are set.
   */
  projectJsonUrl?: string;

  /**
   * Project json (either a json string or a json object).
   *
   * If set, the page will be pre-loaded with the json content. The
   * `projectJsonUrl` field above takes precedence over this field if both are
   * set.
   */
  projectJson?: string|{};
}

/** A VisualBlocks instance. */
export interface VisualBlocksInstance {
  /** The behavior object to get updates for project json. */
  curProject$: BehaviorSubject<SavedProject|undefined>;

  /** Loads the project from a json url. */
  loadProjectFromJsonUrl: (url: string) => void;

  /** Loads the project from json. */
  loadProjectFromJson: (json: string|{}) => void;

  /** Clears all the nodes. */
  reset: () => void;
}

/**
 * A single saved project.
 */
export declare interface SavedProject {
  project: ProjectInfo;
  graph: SerializedGraph;
  customNodeUrls?: string[];
}

/**
 * Metadata for a project.
 */
export declare interface ProjectInfo {
  id: string;
  name: string;
  creationTs: number;
  lastModifiedTs: number;
  userSetData?: UserSetData;
}

/**
 * Metadata for a project set by the user.
 */
export declare interface UserSetData {
  description?: string;
  tags?: Tag[];
  contactURL?: string;
  tutorialYouTube?: string;
}

/**
 * Possible tags for a project.
 */
export enum Tag {
  TEXT = 'text',
  VISION = 'vision',
  OTHER = 'other',
}

/** A serialized graph.  */
export declare interface SerializedGraph {
  nodes: SerializedNode[];
  // tslint:disable-next-line:no-any Allow custom types.
  customData?: any;
}

/** A serialized node. */
export declare interface SerializedNode {
  /** The id of the node. */
  id: string;

  /** The custom display label for the node title. */
  displayLabel?: string;

  /** The node spec id. */
  nodeSpecId: string;

  /** UI related data. */
  uiData: UiData;

  /** Error. */
  error?: NodeError;

  /** Custom data. */
  // tslint:disable-next-line:no-any Allow custom types.
  customData?: any;

  /** Property values. */
  propValues?: {[propId: string]: JsonValue};

  /** Input values. */
  inputValues?: {[inputId: string]: JsonValue};

  /**
   * Serialized incoming edges that connect to this node, indexed by
   * input ids.
   *
   * An input might have 1 or more connected edges.
   */
  incomingEdges?: {[inputId: string]: SerializedIncomingEdge[]};
}

/** Node UI related data. */
export declare interface UiData {
  /** X position in the node graph editor. */
  posX: number;
  /** Y position in the node graph editor. */
  posY: number;
  /** Width of the node panel. */
  width: number;
  /** Whether this node is selected or not. */
  selected: boolean;
  /** Whether this node is hovered or not. */
  hovered: boolean;
  /** Height of the visualization. */
  visualizationHeight?: number;
}

/** An error in a node. */
export interface NodeError {
  title: string;
  message: string;
}

/** The types of serializable values supported by editors. */
export declare type JsonValue =
    string | number | boolean | Json | object | JsonValueArray;


/** A Json object. */
export declare interface Json {
  [name: string]: JsonValue;
}

/** An array of JsonValues. */
export declare type JsonValueArray = JsonValue[];

/** A serialized incoming edge. */
export declare interface SerializedIncomingEdge {
  /** The id of the source node. */
  sourceNodeId: string;

  /** The id of the output in the source node. */
  outputId: string;
}
