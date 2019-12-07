/* @flow */

declare module 'react-select' {
    import type { ComponentType, Element as ReactElement, ElementRef, Node, Ref } from 'react';

    declare type OptionType = {
        [string]: any,
    };

    declare type OptionsType = Array<OptionType>;

    declare type ValueType = OptionType | OptionsType | null | void;

    declare type ActionTypes =
        | 'select-option'
        | 'deselect-option'
        | 'remove-value'
        | 'pop-value'
        | 'set-value'
        | 'clear'
        | 'create-option';

    declare export type ActionMeta = {
        action: ActionTypes,
    };

    declare type InputActionTypes = 'set-value' | 'input-change' | 'input-blur' | 'menu-close';

    declare type InputActionMeta = {|
        action: InputActionTypes,
    |};

    declare type FormatOptionLabelContext = 'menu' | 'value';

    declare type FormatOptionLabelMeta = {
        context: FormatOptionLabelContext,
        inputValue: string,
        selectValue: ValueType,
    };

    declare type GroupType = {
        options: OptionsType,
        [string]: any,
    };

    declare type ClassNamesState = { [string]: boolean } | void;

    declare type ThemeSpacing = {
        baseUnit: number,
        controlHeight: number,
        menuGutter: number,
    };

    declare type Theme = {
        borderRadius: number,
        colors: { [key: string]: string },
        spacing: ThemeSpacing,
    };

    declare type ThemeConfig = Theme | ((theme: Theme) => Theme);

    declare type MenuPlacement = 'auto' | 'bottom' | 'top';
    declare type MenuPosition = 'absolute' | 'fixed';

    // ==============================
    //  - Components -
    // ==============================

    declare type CommonProps = {
        clearValue: () => void,
        className?: string,
        cx: (?string | null, ClassNamesState | void, string | void) => string | void,
        /**
         Get the styles of a particular part of the select. Pass in the name of the
         property as the first argument, and the current props as the second argument.
         See the `styles` object for the properties available.
        */
        getStyles: (string, any) => {},
        theme: Theme,
        getValue: () => ValueType,
        hasValue: boolean,
        isMulti: boolean,
        options: OptionsType,
        selectOption: (OptionType) => void,
        selectProps: any,
        setValue: (ValueType, ActionTypes) => void,
    };

    // ==============================
    // Containers
    // ==============================

    /* Root Container */
    declare type ContainerState = {
        isDisabled: boolean,
        /** Whether the text in the select is indented from right to left. */
        isRtl: boolean,
    };

    declare export type ContainerProps = CommonProps &
        ContainerState & {
            children: Node,
            /** Inner props to be passed down to the container. */
            innerProps: { onKeyDown: KeyboardEventHandler },
        };
    declare type ContainerDefaultStyles = {
        direction: ?'rtl',
        pointerEvents: ?'none', // cancel mouse events when disabled
        position: 'relative',
    };

    /* ValueContainer */
    declare export type ValueContainerProps = CommonProps & {
        isMulti: boolean,
        hasValue: boolean,
        children: Node,
    };
    declare type ValueContainerDefaultStyles = {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexWrap: 'wrap',
        padding: string,
        WebkitOverflowScrolling: 'touch',
        position: 'relative',
        overflow: 'hidden',
    };

    /* IndicatorsContainer */
    declare type IndicatorsState = {
        isRtl: boolean,
    };
    declare export type IndicatorContainerProps = CommonProps &
        IndicatorsState & {
            children: Node,
        };
    declare type IndicatorContainerDefaultStyles = {
        alignItems: 'center',
        alignSelf: 'stretch',
        display: 'flex',
        flexShrink: 0,
    };

    // ==============================
    // Control
    // ==============================

    declare type ControlState = {
        isDisabled: boolean,
        isFocused: boolean,
    };
    declare export type ControlProps = CommonProps &
        ControlState & {
            /** Children to render. */
            children: Node,
            innerRef: ElementRef<*>,
            /** The mouse down event and the innerRef to pass down to the controller element. */
            innerProps: {
                onMouseDown: (SyntheticMouseEvent<HTMLElement>) => void,
                onTouchEnd: (event: SyntheticTouchEvent<HTMLElement>) => void,
            },
        };
    declare type ControlDefaultStyles = {
        alignItems: 'center',
        backgroundColor: string,
        borderColor: string,
        borderRadius: number,
        borderStyle: 'solid',
        borderWidth: 1,
        boxShadow: ?string,
        cursor: 'default',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        minHeight: number,
        outline: '0 !important',
        position: 'relative',
        transition: 'all 100ms',
        '&:hover': {
            borderColor: string,
        },
    };

    // ==============================
    // Group
    // ==============================

    declare export type GroupProps = CommonProps & {
        children: Node,
        /** Component to wrap the label, recieves headingProps. */
        Heading: ComponentType<any>,
        /** Props to pass to Heading. */
        headingProps: any,
        /** Label to be displayed in the heading component. */
        label: Node,
    };
    declare type GroupDefaultStyles = {
        paddingBottom: number,
        paddingTop: number,
    };

    declare export type GroupHeadingProps = {
        getStyles: (string, any) => {},
        theme: Theme,
    };
    declare type GroupHeadingDefaultStyles = {
        color: '#999',
        cursor: 'default',
        display: 'block',
        fontSize: '75%',
        fontWeight: '500',
        marginBottom: '0.25em',
        paddingLeft: number,
        paddingRight: number,
        textTransform: 'uppercase',
    };

    // ==============================
    // Indicators
    // ==============================

    /* Clear and Dropdown */
    declare type IndicatorProps = CommonProps & {
        /** The children to be rendered inside the indicator. */
        children: Node,
        /** Props that will be passed on to the children. */
        innerProps: any,
        /** Whether the text is right to left */
        isRtl: boolean,
    };
    declare type IndicatorBaseDefaultStyles = {
        color: string,
        display: 'flex',
        padding: number,
        transition: 'color 150ms',
        ':hover': {
            color: string,
        },
    };

    /* Clear */
    declare type IndicatorClearState = {
        isFocused: boolean,
    };
    declare export type IndicatorClearProps = IndicatorProps & IndicatorClearState;
    declare type IndicatorClearDefaultStyles = IndicatorBaseDefaultStyles;

    /* Dropdown */
    declare type IndicatorDropdownState = {
        isFocused: boolean,
        isDisabled: boolean,
    };
    declare export type IndicatorDropdownProps = IndicatorProps & IndicatorDropdownState;
    declare type IndicatorDropdownDefaultStyles = IndicatorBaseDefaultStyles;

    /* Separator */
    declare type SeparatorState = {
        isDisabled: boolean,
        isFocused: boolean,
    };
    declare export type IndicatorSeparatorProps = IndicatorProps & SeparatorState;
    declare type IndicatorSeparatorDefaultStyles = {
        alignSelf: 'stretch',
        backgroundColor: string,
        marginBottom: number,
        marginTop: number,
        width: 1,
    };

    /* Loading */
    declare type LoadingIconState = {
        isFocused: boolean,
        isDisabled: boolean,
        /** Set size of the container. */
        size: number,
    };
    declare export type LoadingIconProps = CommonProps &
        LoadingIconState & {
            /** Props that will be passed on to the children. */
            innerProps: any,
            /** Whether the text is right to left */
            isRtl: boolean,
        };
    declare type IndicatorLoadingDefaultStyles = {
        color: string,
        display: 'flex',
        padding: number,
        transition: 'color 150ms',
        alignSelf: 'center',
        fontSize: number,
        lineHeight: 1,
        marginRight: number,
        textAlign: 'center',
        verticalAlign: 'middle',
    };

    // ==============================
    // Input
    // ==============================

    declare export type InputProps = {
        getStyles: (string, any) => {},
        theme: Theme,
    } & {
        cx: (?string | null, ?ClassNamesState, ?string) => string | void,
        /** Reference to the internal element */
        innerRef: (ElementRef<*>) => void,
        /** Set whether the input should be visible. Does not affect input size. */
        isHidden: boolean,
        isDisabled?: boolean,
        className?: string,
    };
    declare type InputDefaultStyles = {
        margin: number,
        paddingBottom: number,
        paddingTop: number,
        visibility: 'hidden' | 'visible',
        color: string,
    };

    // ==============================
    // Menu
    // ==============================

    declare type MenuState = {
        placement: 'bottom' | 'top' | null,
        maxHeight: number,
    };
    declare export type MenuProps = CommonProps &
        MenuState & {
            /** Callback to update the portal after possible flip. */
            getPortalPlacement: (MenuState) => void,
            /** Props to be passed to the menu wrapper. */
            innerProps: Object,
            /** Set the maximum height of the menu. */
            maxMenuHeight: number,
            /** Set whether the menu should be at the top, at the bottom. The auto options sets it to bottom. */
            menuPlacement: MenuPlacement,
            /* The CSS position value of the menu, when "fixed" extra layout management is required */
            menuPosition: MenuPosition,
            /** Set the minimum height of the menu. */
            minMenuHeight: number,
            /** Set whether the page should scroll to show the menu. */
            menuShouldScrollIntoView: boolean,
        } & {
            /** Reference to the internal element, consumed by the MenuPlacer component */
            innerRef: ElementRef<*>,
            children: ReactElement<*>,
        };
    declare type MenuDefaultStyles = {
        top?: '100%',
        bottom?: '100%',
        backgroundColor: string,
        borderRadius: number,
        boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
        marginBottom: number,
        marginTop: number,
        position: 'absolute',
        width: '100%',
        zIndex: 1,
    };

    // ==============================
    // MenuList
    // ==============================

    declare type MenuListState = {
        isMulti: boolean,
        maxHeight: number,
    };
    declare export type MenuListComponentProps = CommonProps &
        MenuListState & {
            children: Node,
            innerRef: Ref<*>,
        };
    declare type MenuListDefaultStyles = {
        maxHeight: number,
        overflowY: 'auto',
        paddingBottom: number,
        paddingTop: number,
        position: 'relative', // required for offset[Height, Top] > keyboard scroll
        WebkitOverflowScrolling: 'touch',
    };

    // ==============================
    // MenuPortal
    // ==============================

    declare export type MenuPortalProps = CommonProps & {
        appendTo: HTMLElement,
        children: Node, // ideally Menu<MenuProps>
        controlElement: HTMLElement,
        menuPlacement: MenuPlacement,
        menuPosition: MenuPosition,
    };
    declare type MenuPortalDefaultStyles = {
        left: number,
        position: MenuPosition,
        top: number,
        width: number,
        zIndex: 1,
    };

    // ==============================
    // MultiValue
    // ==============================

    declare export type MultiValueProps = CommonProps & {
        children: Node,
        components: any,
        cropWithEllipsis: boolean,
        data: any,
        innerProps: any,
        isFocused: boolean,
        isDisabled: boolean,
        removeProps: {
            onTouchEnd: (any) => void,
            onClick: (any) => void,
            onMouseDown: (any) => void,
        },
    };
    declare type MultiValueDefaultStyles = {
        backgroundColor: string,
        borderRadius: number,
        display: 'flex',
        margin: number,
        minWidth: 0, // resolves flex/text-overflow bug
    };

    declare type MultiValueGenericProps = {
        children: Node,
        data: any,
        innerProps: { className?: string },
        selectProps: any,
    };

    /* MultiValueContainer */
    declare export type MultiValueContainerProps = MultiValueGenericProps;

    /* MultiValueLabel */
    declare export type MultiValueLabelProps = MultiValueGenericProps;
    declare type MultiValueLabelDefaultStyles = {
        borderRadius: number,
        color: string,
        fontSize: '85%',
        overflow: 'hidden',
        padding: 3,
        paddingLeft: 6,
        textOverflow: ?'ellipsis',
        whiteSpace: 'nowrap',
    };

    /* MultiValueRemove */
    declare export type MultiValueRemoveProps = CommonProps & {
        children: Node,
        data: any,
        innerProps: {
            className: string,
            onTouchEnd: (any) => void,
            onClick: (any) => void,
            onMouseDown: (any) => void,
        },
        selectProps: any,
    };
    declare type MultiValueRemoveDefaultStyles = {
        alignItems: 'center',
        borderRadius: number,
        backgroundColor: ?string,
        display: 'flex',
        paddingLeft: number,
        paddingRight: number,
        ':hover': {
            backgroundColor: string,
            color: string,
        },
    };

    // ==============================
    // Notice
    // ==============================

    declare export type NoticeProps = CommonProps & {
        children: Node,
        innerProps: { [string]: any },
    };
    declare type NoticeDefaultStyles = {
        color: string,
        padding: string,
        textAlign: 'center',
    };

    // ==============================
    // Option
    // ==============================

    declare type OptionState = {
        isDisabled: boolean,
        isFocused: boolean,
        isSelected: boolean,
    };
    declare export type OptionProps = CommonProps &
        OptionState & {
            children: Node,
            /** Inner ref to DOM Node */
            innerRef: Ref<*>,
            /** props passed to the wrapping element for the group. */
            innerProps: {
                id: string,
                key: string,
                onClick: MouseEventHandler,
                onMouseOver: MouseEventHandler,
                tabIndex: number,
            },
            /* Text to be displayed representing the option. */
            label: string,
            /* Type is used by the menu to determine whether this is an option or a group.
            In the case of option this is always `option`. */
            type: 'option',
            /* The data of the selected option. */
            data: any,
        };
    declare type OptionDefaultStyles = {
        backgroundColor: string,
        color: string,
        cursor: 'default',
        display: 'block',
        fontSize: 'inherit',
        padding: string,
        width: '100%',
        userSelect: 'none',
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

        // provide some affordance on touch devices
        ':active': {
            backgroundColor: string,
        },
    };

    // ==============================
    // Placeholder
    // ==============================

    declare type PlaceholderState = {
        isDisabled: boolean,
    };
    declare export type PlaceholderProps = CommonProps &
        PlaceholderState & {
            children: Node,
            /** props passed to the wrapping element for the group. */
            innerProps: { [string]: any },
        };
    declare type PlaceholderDefaultStyles = {
        color: string,
        marginLeft: number,
        marginRight: number,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
    };

    // ==============================
    // SingleValue
    // ==============================

    declare type SingleValueState = {
        isDisabled: boolean,
    };
    declare export type SingleValueProps = CommonProps &
        SingleValueState & {
            children: Node,
            /* The data of the selected option rendered in the Single Value componentn */
            data: any,
        };
    declare type SingleValueDefaultStyles = {
        color: string,
        marginLeft: number,
        marginRight: number,
        maxWidth: string,
        overflow: 'hidden',
        position: 'absolute',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        top: '50%',
        transform: 'translateY(-50%)',
    };

    declare type SelectComponents = {
        ClearIndicator: ComponentType<IndicatorClearProps> | null,
        Control: ComponentType<ControlProps>,
        DropdownIndicator: ComponentType<IndicatorDropdownProps> | null,
        DownChevron: ComponentType<any>,
        CrossIcon: ComponentType<any>,
        Group: ComponentType<GroupProps>,
        GroupHeading: ComponentType<GroupHeadingProps>,
        IndicatorsContainer: ComponentType<IndicatorContainerProps>,
        IndicatorSeparator: ComponentType<IndicatorSeparatorProps> | null,
        Input: ComponentType<InputProps>,
        LoadingIndicator: ComponentType<LoadingIconProps> | null,
        Menu: ComponentType<MenuProps>,
        MenuList: ComponentType<MenuListComponentProps>,
        MenuPortal: ComponentType<MenuPortalProps>,
        LoadingMessage: ComponentType<NoticeProps>,
        NoOptionsMessage: ComponentType<NoticeProps>,
        MultiValue: ComponentType<MultiValueProps>,
        MultiValueContainer: ComponentType<MultiValueContainerProps>,
        MultiValueLabel: ComponentType<MultiValueLabelProps>,
        MultiValueRemove: ComponentType<MultiValueRemoveProps>,
        Option: ComponentType<OptionProps>,
        Placeholder: ComponentType<PlaceholderProps>,
        SelectContainer: ComponentType<ContainerProps>,
        SingleValue: ComponentType<SingleValueProps>,
        ValueContainer: ComponentType<ValueContainerProps>,
    };

    declare export var components: SelectComponents;

    declare type SelectComponentsConfig = $Shape<SelectComponents>;

    declare type Styles = {
        clearIndicator?: (IndicatorClearDefaultStyles, IndicatorClearProps) => {},
        container?: (ContainerDefaultStyles, ContainerProps) => {},
        control?: (ControlDefaultStyles, ControlProps) => {},
        dropdownIndicator?: (IndicatorDropdownDefaultStyles, IndicatorDropdownProps) => {},
        group?: (GroupDefaultStyles, GroupProps) => {},
        groupHeading?: (GroupHeadingDefaultStyles, GroupHeadingProps) => {},
        indicatorsContainer?: (IndicatorContainerDefaultStyles, IndicatorContainerProps) => {},
        indicatorSeparator?: (IndicatorSeparatorDefaultStyles, IndicatorSeparatorProps) => {},
        input?: (InputDefaultStyles, InputProps) => {},
        loadingIndicator?: (IndicatorLoadingDefaultStyles, LoadingIconProps) => {},
        loadingMessageCSS?: (NoticeDefaultStyles, NoticeProps) => {},
        menu?: (MenuDefaultStyles, MenuProps) => {},
        menuList?: (MenuListDefaultStyles, MenuListComponentProps) => {},
        menuPortal?: (MenuPortalDefaultStyles, MenuPortalProps) => {},
        multiValue?: (MultiValueDefaultStyles, MultiValueProps) => {},
        multiValueLabel?: (MultiValueLabelDefaultStyles, MultiValueProps) => {},
        multiValueRemove?: (MultiValueRemoveDefaultStyles, MultiValueRemoveProps) => {},
        noOptionsMessageCSS?: (NoticeDefaultStyles, NoticeProps) => {},
        option?: (OptionDefaultStyles, OptionProps) => {},
        placeholder?: (PlaceholderDefaultStyles, PlaceholderProps) => {},
        singleValue?: (SingleValueDefaultStyles, SingleValueProps) => {},
        valueContainer?: (ValueContainerDefaultStyles, ValueContainerProps) => {},
    };

    declare export type StylesConfig = $Shape<Styles>;

    declare export function mergeStyles(source: Styles, target: Styles): Styles;

    declare export type SelectBaseProps = {
        /* Aria label (for assistive tech) */
        'aria-label'?: string,
        /* HTML ID of an element that should be used as the label (for assistive tech) */
        'aria-labelledby'?: string,
        /* Focus the control when it is mounted */
        autoFocus?: boolean,
        /* Remove the currently focused option when the user presses backspace */
        backspaceRemovesValue?: boolean,
        /* Remove focus from the input when the user selects an option (handy for dismissing the keyboard on touch devices) */
        blurInputOnSelect?: boolean,
        /* When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent  */
        captureMenuScroll?: boolean,
        /* Sets a className attribute on the outer component */
        className?: string,
        /*
        If provided, all inner components will be given a prefixed className attribute.
        This is useful when styling via CSS classes instead of the Styles API approach.
        */
        classNamePrefix?: string | null,
        /* Close the select menu when the user selects an option */
        closeMenuOnSelect?: boolean,
        /*
        If `true`, close the select menu when the user scrolls the document/body.
        If a function, takes a standard javascript `ScrollEvent` you return a boolean:
        `true` => The menu closes
        `false` => The menu stays open
        This is useful when you have a scrollable modal and want to portal the menu out,
        but want to avoid graphical issues.
        */
        closeMenuOnScroll?: boolean | EventListener,
        /*
        This complex object includes all the compositional components that are used
        in `react-select`. If you wish to overwrite a component, pass in an object
        with the appropriate namespace.
        If you only wish to restyle a component, we recommend using the `styles` prop
        instead. For a list of the components that can be passed in, and the shape
        that will be passed to them, see [the components docs](/api#components)
        */
        components?: SelectComponentsConfig,
        /* Whether the value of the select, e.g. SingleValue, should be displayed in the control. */
        controlShouldRenderValue?: boolean,
        /* Delimiter used to join multiple values into a single HTML Input value */
        delimiter?: string,
        /* Clear all values when the user presses escape AND the menu is closed */
        escapeClearsValue?: boolean,
        /* Custom method to filter whether an option should be displayed in the menu */
        filterOption?: ((Object, string) => boolean) | null,
        /* Formats group labels in the menu as React components */
        formatGroupLabel?: (GroupType) => Node,
        /* Formats option labels in the menu and control as React components */
        formatOptionLabel?: (OptionType, FormatOptionLabelMeta) => Node,
        /* Resolves option data to a string to be displayed as the label by components */
        getOptionLabel?: (OptionType) => string,
        /* Resolves option data to a string to compare options and specify value attributes */
        getOptionValue?: (OptionType) => string,
        /* Hide the selected option from the menu */
        hideSelectedOptions?: boolean,
        /* The id to set on the SelectContainer component. */
        id?: string,
        /* The value of the search input */
        inputValue?: string,
        /* The id of the search input */
        inputId?: string,
        /* Define an id prefix for the select components e.g. {your-id}-value */
        instanceId?: number | string,
        /* Is the select value clearable */
        isClearable?: boolean,
        /* Is the select disabled */
        isDisabled?: boolean,
        /* Is the select in a state of loading (async) */
        isLoading?: boolean,
        /* Override the built-in logic to detect whether an option is disabled */
        isOptionDisabled?: (OptionType, OptionsType) => boolean | false,
        /* Override the built-in logic to detect whether an option is selected */
        isOptionSelected?: (OptionType, OptionsType) => boolean,
        /* Support multiple selected options */
        isMulti?: boolean,
        /* Is the select direction right-to-left */
        isRtl?: boolean,
        /* Whether to enable search functionality */
        isSearchable?: boolean,
        /* Async: Text to display when loading options */
        loadingMessage?: ({ inputValue: string }) => string | null,
        /* Minimum height of the menu before flipping */
        minMenuHeight?: number,
        /* Maximum height of the menu before scrolling */
        maxMenuHeight?: number,
        /* Whether the menu is open */
        menuIsOpen?: boolean,
        /* Default placement of the menu in relation to the control. 'auto' will flip
         when there isn't enough space below the control. */
        menuPlacement?: MenuPlacement,
        /* The CSS position value of the menu, when "fixed" extra layout management is required */
        menuPosition?: MenuPosition,
        /* Whether the menu should use a portal, and where it should attach */
        menuPortalTarget?: HTMLElement,
        /* Whether to block scroll events when the menu is open */
        menuShouldBlockScroll?: boolean,
        /* Whether the menu should be scrolled into view when it opens */
        menuShouldScrollIntoView?: boolean,
        /* Name of the HTML Input (optional - without this, no input will be rendered) */
        name?: string,
        /* Text to display when there are no options */
        noOptionsMessage?: ({ inputValue: string }) => string | null,
        /* Handle blur events on the control */
        onBlur?: FocusEventHandler,
        /* Handle change events on the select */
        onChange: (ValueType, ActionMeta) => void,
        /* Handle focus events on the control */
        onFocus?: FocusEventHandler,
        /* Handle change events on the input */
        onInputChange?: (string, InputActionMeta) => void,
        /* Handle key down events on the select */
        onKeyDown?: KeyboardEventHandler,
        /* Handle the menu opening */
        onMenuOpen?: () => void,
        /* Handle the menu closing */
        onMenuClose?: () => void,
        /* Fired when the user scrolls to the top of the menu */
        onMenuScrollToTop?: (SyntheticEvent<HTMLElement>) => void,
        /* Fired when the user scrolls to the bottom of the menu */
        onMenuScrollToBottom?: (SyntheticEvent<HTMLElement>) => void,
        /* Allows control of whether the menu is opened when the Select is focused */
        openMenuOnFocus?: boolean,
        /* Allows control of whether the menu is opened when the Select is clicked */
        openMenuOnClick?: boolean,
        /* Array of options that populate the select menu */
        options?: OptionsType,
        /* Number of options to jump in menu when page{up|down} keys are used */
        pageSize?: number,
        /* Placeholder text for the select value */
        placeholder?: string,
        /* Status to relay to screen readers */
        screenReaderStatus?: ({ count: number }) => string,
        /* Style modifier methods */
        styles?: StylesConfig,
        /* Theme modifier method */
        theme?: ThemeConfig,
        /* Sets the tabIndex attribute on the input */
        tabIndex?: string,
        /* Select the currently focused option when the user presses tab */
        tabSelectsValue?: boolean,
        /* The value of the select; reflected by the selected option */
        value?: ValueType,
    };

    declare export type CreatableExtraProps = {
        /* Allow options to be created while the `isLoading` prop is true. Useful to
         prevent the "create new ..." option being displayed while async results are
         still being loaded. */
        allowCreateWhileLoading?: boolean,
        /* Gets the label for the "create new ..." option in the menu. Is given the
         current input value. */
        formatCreateLabel?: (string) => Node,
        /* Determines whether the "create new ..." option should be displayed based on
         the current input value, select value and options array. */
        isValidNewOption?: (string, ValueType, OptionsType) => boolean,
        /* Returns the data for the new option when it is created. Used to display the
         value, and is passed to `onChange`. */
        getNewOptionData?: (string, Node) => OptionType,
        /* If provided, this will be called with the input value when a new option is
         created, and `onChange` will **not** be called. Use this when you need more
         control over what happens when new options are created. */
        onCreateOption?: (string) => void,
        /* Sets the position of the createOption element in your options list. Defaults to 'last' */
        createOptionPosition?: 'first' | 'last',
    };

    declare type AsyncExtraProps = {
        /* The default set of options to show before the user starts searching. When
         set to `true`, the results for loadOptions('') will be autoloaded. */
        defaultOptions: OptionsType | boolean,
        /* Function that returns a promise, which is the set of options to be used
         once the promise resolves. */
        loadOptions: (string, (OptionsType) => void) => Promise<*> | void,
        /* If cacheOptions is truthy, then the loaded data will be cached. The cache
         will remain until `cacheOptions` changes value. */
        cacheOptions: any,
    };

    declare type StateManagerProps = {
        defaultInputValue?: string,
        defaultMenuIsOpen?: boolean,
        defaultValue?: ValueType,
    };

    declare export type SelectProps = StateManagerProps & SelectBaseProps;
    declare export type CreatableProps = StateManagerProps & SelectBaseProps & CreatableExtraProps;
    declare export type AsyncProps = StateManagerProps & SelectBaseProps & AsyncExtraProps;
    declare export type AsyncCreatableProps = StateManagerProps &
        SelectBaseProps &
        CreatableExtraProps &
        AsyncExtraProps;

    declare export default class Select extends React$Component<SelectProps> {
        focus: () => void;
        blur: () => void;
    }

    declare export class Creatable extends React$Component<CreatableProps> {
        focus: () => void;
        blur: () => void;
    }

    declare export class Async extends React$Component<AsyncProps> {
        focus: () => void;
        blur: () => void;
    }

    declare export class AsyncCreatable extends React$Component<AsyncCreatableProps> {
        focus: () => void;
        blur: () => void;
    }
}
