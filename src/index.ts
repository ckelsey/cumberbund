import EaseBounce from "./animation/ease-bounce"
import EaseInOut from "./animation/ease-in-out"
import EaseIn from "./animation/ease-in"
import EaseOut from "./animation/ease-out"
import EasePower from "./animation/ease-power"
import GetEase from "./animation/get-ease"

// import * from './ast/ast-to-string'
// import * from './ast/function-reader'

import Drag from "./behaviors/drag"
import Overlay from "./behaviors/overlay"


import Equals from "./checks/equals"
import IfInvalid from "./checks/if-invalid"
import IsSelector from "./checks/if-selector"
import IndexOf from "./checks/index-of"
import IsFunction from "./checks/is-function"
import IsItNull from "./checks/is-it-null"
import IsNothing from "./checks/is-nothing"
import UntilTrue from "./checks/until-true"

import ColorObject, { ColorType } from "./color/color-object"
import IsValidHex from "./color/is-valid-hex"

import ArrayFrom from "./conversion/array-from"
import CommasToArray from "./conversion/commas-to-array"
import DateToObject from "./conversion/date-to-object"
import FromEntities from "./conversion/from-entities"
import FromJSON from "./conversion/from-json"
import FromUriComponent from "./conversion/from-uri-component"
import IsValid from "./conversion/set-valid"
import ToArray from "./conversion/to-array"
import ToBool from "./conversion/to-bool"
import ToDate from "./conversion/to-date"
import ToFilter from "./conversion/to-filter"
import ToFunction from "./conversion/to-function"
import ToJSON from "./conversion/to-json"
import ToMap from "./conversion/to-map"
import ToNumber from "./conversion/to-number"
import ToObject from "./conversion/to-object"
import ToOptions from "./conversion/to-options"
import ToPlainText from "./conversion/to-plain-text"
import ToRegex from "./conversion/to-regex"
import ToStringOrNumber from "./conversion/to-string"
import ToString from "./conversion/to-string-or-number"

import AppendStyleElement from "./dom/append-style-element"
import AttributeSetRemove from "./dom/attribute-set-remove"
import Create from "./dom/create"
import DispatchEvent from "./dom/dispatch-event"
import ElementEvents from "./dom/element-events"
import FormControl from "./dom/form-control"
import GetEventTarget from "./dom/get-event-target"
import GetInputValue from "./dom/get-input-value"
import IfElement from "./dom/if-element"
import IfElements from "./dom/if-elements"
import InputLabelId from "./dom/input-label-id"
import InputName from "./dom/input-name"
import InputValueType from "./dom/input-value-type"
import Manipulate from "./dom/manipulate"
import DOMReady from "./dom/ready"
import RemoveChildren from "./dom/remove-children"
import RemoveElement from "./dom/remove-element"
import RenderLightDom from "./dom/render-light-dom"
import Select from "./dom/select"
import SelectAll from "./dom/select-all"
import SetAttribute from "./dom/set-attribute"
import SetCaret from "./dom/set-caret"
import SetInputValue from "./dom/set-input-value"
import SetStyleRules from "./dom/set-style-rules"
import TextareaHeight from "./dom/textarea-height"
import WalkUp from "./dom/walk-up"
import WasClickedOn from "./dom/was-clicked-on"
import { getSlottedElement, getSlot, slotEvent } from "./dom/web-components/field-utils/slot-element"
import CreateComponent from "./dom/web-components/component"

import Partial from "./function-helpers/partial"
import Pipe from "./function-helpers/pipe"

import ID from "./id"

import Download from "./media/download-file"
import PixelFromMedia from "./media/pixel-from-media"
import ScreenCapture from "./media/screen-capture"
import ScreenShare from "./media/screen-share"

import CloneObject from "./objects/clone"
import Diff from "./objects/diff"
import Get from "./objects/get"
import Merge from "./objects/merge"
import Remove from "./objects/remove"
import Set from "./objects/set"

import EventObserver from "./observe/event-observer"
import Observer, { SubscribeFn, nullObserver } from "./observe/observer"

import getQuery from "./routing/get-query"
import GetRouteByPath from "./routing/get-route-by-path"
import LinkClickObserver from "./routing/link-click-observer"
import parseUrl from "./routing/parse-url"
import queryObjectToString from "./routing/query-object-to-string"
import Routing from "./routing/routing"
import UpdateHistory from "./routing/update-history"

import Debounce from "./timing/debounce"
import OnNextFrame from "./timing/on-next-frame"
import Timer from "./timing/timer"

import Try from "./try"

import IsDate from "./types/is-date"
import IsDom from "./types/is-dom"
import IsEmpty from "./types/is-empty"
import IsNoValue from "./types/is-no-value"
import IsNonCollection from "./types/is-non-collection"
import IsObject from "./types/is-object"
import Type from "./types/type"

import ValidateHtml from "./validate/html"

export {
    EaseBounce, EaseInOut, EaseIn, EaseOut, EasePower, GetEase,
    Overlay, Drag,
    Equals, IfInvalid, IsSelector, IndexOf, IsFunction, IsItNull, IsNothing, UntilTrue,
    ColorObject, ColorType, IsValidHex,
    ArrayFrom, CommasToArray, DateToObject, FromEntities, FromJSON, FromUriComponent, IsValid, ToArray, ToBool, ToDate, ToFilter, ToFunction, ToJSON, ToMap, ToNumber, ToObject, ToOptions, ToPlainText, ToRegex, ToStringOrNumber, ToString,
    AppendStyleElement, AttributeSetRemove, Create, DispatchEvent, ElementEvents, FormControl, GetEventTarget, GetInputValue, IfElement, IfElements, InputLabelId, InputName, InputValueType, Manipulate, DOMReady, RemoveChildren, RemoveElement, RenderLightDom, SelectAll, Select, SetAttribute, SetCaret, SetInputValue, SetStyleRules, TextareaHeight, WalkUp, WasClickedOn,
    CreateComponent, getSlottedElement, getSlot, slotEvent,
    Partial, Pipe,
    ID,
    Download, PixelFromMedia, ScreenCapture, ScreenShare,
    CloneObject, Diff, Get, Merge, Remove, Set,
    EventObserver, Observer, SubscribeFn, nullObserver,
    getQuery, GetRouteByPath, LinkClickObserver, parseUrl, queryObjectToString, Routing, UpdateHistory,
    Debounce, OnNextFrame, Timer,
    Try,
    IsDate, IsDom, IsEmpty, IsNoValue, IsNonCollection, IsObject, Type,
    ValidateHtml,
}