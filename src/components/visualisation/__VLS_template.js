import { __VLS_publicComponent, __VLS_internalComponent, __VLS_componentsOption, __VLS_name, makeSearch, isFilterOpened, searchReseault, opendetails, wrapSubstringWithTag, openFilter, searchInput } from './SearchAndFilter.vue';

function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_publicComponent, new () => {}>> & InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & typeof __VLS_publicComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'VIcon', typeof __VLS_localComponents, "VIcon", "vIcon", "v-icon">;
({} as __VLS_IntrinsicElements).form; ({} as __VLS_IntrinsicElements).form;
({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).span; ({} as __VLS_IntrinsicElements).span; ({} as __VLS_IntrinsicElements).span; ({} as __VLS_IntrinsicElements).span; ({} as __VLS_IntrinsicElements).span; ({} as __VLS_IntrinsicElements).span;
__VLS_components.VIcon; __VLS_components.VIcon; __VLS_components.vIcon; __VLS_components.vIcon; __VLS_components["v-icon"]; __VLS_components["v-icon"];
// @ts-ignore
[VIcon, VIcon,];
({} as __VLS_IntrinsicElements).input;
{
const __VLS_0 = ({} as __VLS_IntrinsicElements)["form"];
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, {});
({} as __VLS_IntrinsicElements).form;
({} as __VLS_IntrinsicElements).form;
const __VLS_2 = __VLS_1({ ...{ ...{ onSubmit: {} as any, }, class: ("relative max-w-[800px] h-full flex-1 flex justify-center gap-0 items-center bg-white rounded-full py-2 "), }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4 = { 'submit': __VLS_pickEvent(__VLS_3.emit!, 'submit' as const, __VLS_componentProps(__VLS_1, __VLS_2).onSubmit) };
__VLS_4 = {
submit: (__VLS_ctx.makeSearch)
};
if (__VLS_ctx.isFilterOpened) {
{
const __VLS_5 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, {});
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_7 = __VLS_6({ ...{ ...{}, class: ((__VLS_ctx.isFilterOpened ? 'h-36' : '')), }, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
{
const __VLS_9 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, {});
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_11 = __VLS_10({ ...{ ...{}, class: ("pb-8 overflow-auto"), }, }, ...__VLS_functionalComponentArgsRest(__VLS_10));
const __VLS_12 = __VLS_pickFunctionalComponentCtx(__VLS_9, __VLS_11)!;
for (const [node, i] of __VLS_getVForSourceType((__VLS_ctx.searchReseault)!)) {
{
const __VLS_13 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, {});
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_15 = __VLS_14({ ...{ ...{ onClick: {} as any, }, class: ("cursor-pointer text-primary hover:text-green-500"), }, }, ...__VLS_functionalComponentArgsRest(__VLS_14));
const __VLS_16 = __VLS_pickFunctionalComponentCtx(__VLS_13, __VLS_15)!;
let __VLS_17 = { 'click': __VLS_pickEvent(__VLS_16.emit!, 'click' as const, __VLS_componentProps(__VLS_14, __VLS_15).onClick) };
__VLS_17 = {
click: $event => {
if (!((__VLS_ctx.isFilterOpened))) return;
__VLS_ctx.opendetails(node);
}
};
{
const __VLS_18 = ({} as __VLS_IntrinsicElements)["span"];
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, {});
({} as __VLS_IntrinsicElements).span;
({} as __VLS_IntrinsicElements).span;
const __VLS_20 = __VLS_19({ ...{ ...{}, }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
const __VLS_21 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20)!;
__VLS_directiveFunction(__VLS_ctx.vHtml)((__VLS_ctx.wrapSubstringWithTag(node.name)));
}
{
const __VLS_22 = ({} as __VLS_IntrinsicElements)["span"];
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, {});
({} as __VLS_IntrinsicElements).span;
({} as __VLS_IntrinsicElements).span;
const __VLS_24 = __VLS_23({ ...{ ...{}, }, }, ...__VLS_functionalComponentArgsRest(__VLS_23));
const __VLS_25 = __VLS_pickFunctionalComponentCtx(__VLS_22, __VLS_24)!;
__VLS_directiveFunction(__VLS_ctx.vHtml)((`(${__VLS_ctx.wrapSubstringWithTag(node.height.toString())}%)`));
}
(__VLS_16.slots!).default;
}
if (i < __VLS_ctx.searchReseault.length) {
{
const __VLS_26 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, {});
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_28 = __VLS_27({ ...{ ...{}, class: ("w-full border-b"), }, }, ...__VLS_functionalComponentArgsRest(__VLS_27));
const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28)!;
}
// @ts-ignore
[makeSearch, isFilterOpened, isFilterOpened, searchReseault, opendetails, wrapSubstringWithTag, wrapSubstringWithTag, searchReseault,];
}
}
if (!__VLS_ctx.searchReseault.length) {
{
const __VLS_30 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, {});
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_32 = __VLS_31({ ...{ ...{}, class: ("text-center"), }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32)!;
{
const __VLS_34 = ({} as __VLS_IntrinsicElements)["span"];
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, {});
({} as __VLS_IntrinsicElements).span;
({} as __VLS_IntrinsicElements).span;
const __VLS_36 = __VLS_35({ ...{ ...{}, }, }, ...__VLS_functionalComponentArgsRest(__VLS_35));
const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_34, __VLS_36)!;
(__VLS_37.slots!).default;
}
(__VLS_33.slots!).default;
}
// @ts-ignore
[searchReseault,];
}
(__VLS_12.slots!).default;
}
(__VLS_8.slots!).default;
}
}
{
const __VLS_38 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, {});
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_40 = __VLS_39({ ...{ ...{ onClick: {} as any, }, class: ("overflow-hidden absolute w-full flex bottom bg-white rounded-full items-center border"), }, }, ...__VLS_functionalComponentArgsRest(__VLS_39));
const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_38, __VLS_40)!;
let __VLS_42 = { 'click': __VLS_pickEvent(__VLS_41.emit!, 'click' as const, __VLS_componentProps(__VLS_39, __VLS_40).onClick) };
__VLS_42 = {
click: (__VLS_ctx.openFilter)
};
{
let __VLS_43!: 'VIcon' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VIcon : 'vIcon' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vIcon : 'v-icon' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-icon'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VIcon'];
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({ ...{}, class: ("cursor-pointer py-4 px-6 hover:bg-gray-300 hover:bg-opacity-50 h-full rounded-full"), type: ("submit"), }));
({} as { VIcon: typeof __VLS_43; }).VIcon;
({} as { VIcon: typeof __VLS_43; }).VIcon;
const __VLS_45 = __VLS_44({ ...{ ...{}, class: ("cursor-pointer py-4 px-6 hover:bg-gray-300 hover:bg-opacity-50 h-full rounded-full"), type: ("submit"), }, }, ...__VLS_functionalComponentArgsRest(__VLS_44));
const __VLS_46 = __VLS_pickFunctionalComponentCtx(__VLS_43, __VLS_45)!;
(__VLS_46.slots!).default;
}
{
const __VLS_47 = ({} as __VLS_IntrinsicElements)["input"];
const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, {});
({} as __VLS_IntrinsicElements).input;
const __VLS_49 = __VLS_48({ ...{ ...{}, value: ((__VLS_ctx.searchInput)), class: ("flex-1 !outline-0  pr-1 z-50 bg-white"), placeholder: ("Type some node key or height"), type: ("text"), }, }, ...__VLS_functionalComponentArgsRest(__VLS_48));
const __VLS_50 = __VLS_pickFunctionalComponentCtx(__VLS_47, __VLS_49)!;
}
(__VLS_41.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!: {};
// @ts-ignore
[openFilter, searchInput,];
return __VLS_slots;
}
