export type Image = {
  url: string;
  id: string;
};
export type User = {
  id: string;
  name: string;
};

export type PrintType = {
  images: Image[];
  name: string;
  summary?: string;
  description?: string;
  id?: string;
  published: string;
  rating: number;
  blueprint: string;
  author: User;
  isFavourite?: boolean;
};

export type Entity = {
  /** 1-based */
  entity_number: number;
  name: string;
  position: Position;
  quality?: string;
  direction?: number;
  enable_logistics_while_moving?: boolean;
  orientation?: number;
  control_behavior?: {
    circuit_enabled?: boolean;
    circuit_condition?: CircuitCondition;
    circuit_condition_enabled?: boolean;
    connect_to_logistic_network?: boolean;
    logistic_condition?: CircuitCondition;
    sections?: null | {
      sections: Array<{
        /** 1-based */
        index: number;
        filters?: Array<
          ItemFilter & {
            count?: number;
            type?: string;
          }
        >;
        group?: string;
      }>;
    };
    is_on?: boolean;
    circuit_mode_of_operation?: number;
    /** used by programmable speaker */
    circuit_parameters?: {
      signal_value_is_pitch: boolean;
      instrument_id: number;
      note_id: number;
    };
    send_to_train?: boolean;
    read_from_train?: boolean;
    read_stopped_train?: boolean;
    train_stopped_signal?: Signal;
    set_trains_limit?: boolean;
    trains_limit_signal?: Signal;
    read_trains_count?: boolean;
    trains_count_signal?: Signal;
    set_priority?: boolean;
    priority_signal?: Signal;
    output_signal?: Signal;

    circuit_read_hand_contents?: boolean;
    /**
     * @see https://lua-api.factorio.com/latest/defines.html#defines.control_behavior
     */
    circuit_hand_read_mode?: number;
    /**
     * @see https://lua-api.factorio.com/latest/defines.html#defines.control_behavior
     */
    circuit_contents_read_mode?: number;

    // Roboport
    read_items_mode?: number;
    read_robot_stats?: boolean;
    available_logistic_output_signal?: Signal;
    total_logistic_output_signal?: Signal;
    available_construction_output_signal?: Signal;
    total_construction_output_signal?: Signal;
    roboport_count_output_signal?: Signal;

    /** used by pump */
    set_filter?: boolean;

    /** used by inserter */
    circuit_set_filters?: boolean;
    circuit_set_stack_size?: boolean;
    stack_control_input_signal?: Signal;

    // train signals
    circuit_close_signal?: boolean;
    circuit_read_signal?: boolean;
    red_output_signal?: null | Signal;
    orange_output_signal?: null | Signal;
    green_output_signal?: null | Signal;

    // gate
    circuit_open_gate?: boolean;
    circuit_read_sensor?: boolean;

    // assembling machine
    set_recipe?: boolean;
    read_contents?: boolean;
    read_working?: boolean;
    working_signal?: Signal;
    read_ingredients?: boolean;
    read_recipe_finished?: boolean;
    recipe_finished_signal?: Signal;

    read_burner_fuel?: boolean;
    read_temperature?: boolean;
    temperature_signal?: Signal;

    arithmetic_conditions?: {
      operation: Operator;
      first_signal_networks?: {
        red: boolean;
        green: boolean;
      };
      second_signal_networks?: {
        red: boolean;
        green: boolean;
      };
      first_signal?: Signal;
      first_constant?: number;
      second_signal?: Signal;
      second_constant?: number;
      output_signal?: Signal;
    };

    decider_conditions?: {
      conditions: null | Array<
        CircuitCondition & {
          first_signal_networks?: {
            red: boolean;
            green: boolean;
          };
          second_signal_networks?: {
            red: boolean;
            green: boolean;
          };
          compare_type?: 'and' | 'or';
        }
      >;
      outputs: null | Array<{
        signal?: Signal;
        copy_count_from_input?: boolean;
        networks?: {
          red: boolean;
          green: boolean;
        };
      }>;
    };

    // lamp settings
    use_colors?: boolean;
    red_signal?: Signal;
    green_signal?: Signal;
    blue_signal?: Signal;
    rgb_signal?: Signal;
    /** @see https://lua-api.factorio.com/latest/defines.html#defines.control_behavior */
    color_mode?: number;
  };

  /** used by lamp */
  always_on?: boolean;

  player_description?: string;
  items?: Array<{
    id: {
      name: string;
      quality?: string;
    };
    items: {
      in_inventory?: Array<{
        /** @see https://lua-api.factorio.com/latest/defines.html#defines.inventory */
        inventory: number;
        /** 0-based */
        stack: number;
        count?: 0;
      }>;
      grid_count?: number;
    };
  }>;
  recipe?: string;
  recipe_quality?: string;

  // chest settings
  /** 0-based */
  bar?: number;

  // cargo wagon settings
  inventory?: null | {
    filters?: ItemFilter[];
    /** 0-based */
    bar?: number;
  };

  // inserter settings
  filters?: ItemFilter[];
  filter_mode?: 'whitelist' | 'blacklist';
  use_filters?: boolean;
  override_stack_size?: number;
  spoil_priority?: 'spoiled-first' | 'fresh-first';

  // belt settings
  type?: 'input' | 'output'; // also used by loader
  input_priority?: 'left' | 'right' | 'none';
  output_priority?: 'left' | 'right' | 'none';

  infinity_settings?: {
    remove_unfiltered_items: boolean;
    filters: Array<
      ItemFilter & {
        count?: number;
        mode: 'at-least' | 'at-most' | 'exactly' | 'add' | 'remove';
        percentage?: number;
        temperature?: number;
      }
    >;
  };

  /** used by splitter */
  filter?: {
    name: string;
    quality?: string;
    comparator?: Comparator;
  };
  /** used by pump */
  fluid_filter?: string;

  request_filters?: {
    sections?: Array<{
      /** 1-based */
      index: number;
      filters?: Array<{
        /** 1-based */
        index: number;
        name: string;
        quality?: string;
        comparator?: Comparator;
        count: number;
        max_count?: number;
      }>;
      group?: string;
      /** Used in rocket silo */
      active?: boolean;
    }>;
    trash_not_requested?: boolean;
    request_from_buffers?: boolean;
  };
  /** Used in rocket silo */
  transitional_request_index?: number;

  /** used by programmable speaker */
  parameters?: {
    playback_volume: number;
    playback_mode: 'local' | 'surface' | 'global';
    allow_polyphony: boolean;
  };
  /** used by programmable speaker */
  alert_parameters?: {
    show_alert: boolean;
    show_on_map: boolean;
    icon_signal_id?: Signal;
    alert_message: string;
  };

  color?: Color;

  // train station
  station?: string;
  manual_trains_limit?: number;
  priority?: number;

  // electric-energy-interface
  power_production?: number;
  power_usage?: number;
  buffer_size?: number;

  // car/tank/spidertron
  trunk_inventory?: null | {
    filters?: ItemFilter[];
  };
  ammo_inventory?: null | {
    filters?: ItemFilter[];
  };
  driver_is_main_gunner?: boolean;
  /** 1-based */
  selected_gun_index?: number;
  grid?: Array<{
    equipment: {
      name: string;
      quality?: string;
    };
    position: Position;
  }>;
  automatic_targeting_parameters?: {
    auto_target_without_gunner: boolean;
    auto_target_with_gunner: boolean;
  };

  // switch
  switch_state?: boolean;
};
export type Signal = {
  type?: string;
  name: string;
  quality?: string;
};
export type Icon = {
  signal: Signal;
  /** 1-based */
  index: number;
};
export type Position = {
  x: number;
  y: number;
};
export type Schedule = {
  locomotives: number[];
  schedule: ScheduleRecord;
};
export type ScheduleRecord = {
  records: Array<{
    station: string;
    wait_conditions?: WaitCondition[];
  }>;
};
export type ItemFilter = {
  /** 1-based */
  index: number;
  name: string;
  quality?: string;
  comparator?: Comparator;
};
export type WaitCondition = {
  type:
    | 'circuit'
    | 'empty'
    | 'fluid_count'
    | 'fuel_item_count_all'
    | 'fuel_item_count_any'
    | 'full'
    | 'fuel_full'
    | 'not_empty'
    | 'inactivity'
    | 'item_count'
    | 'passenger_not_present'
    | 'passenger_present'
    | 'specific_destination_full'
    | 'specific_destination_not_full'
    | 'time';
  compare_type: 'and' | 'or';
  ticks?: number;
  condition?: CircuitCondition;
  station?: string;
};
export const COMPARATOR = {
  greaterThan: '>',
  lessThan: '<',
  equal: '=',
  greaterThanEqual: '≥',
  lessThanEqual: '≤',
  notEqual: '≠',
} as const;

export type Comparator = (typeof COMPARATOR)[keyof typeof COMPARATOR];

export type CircuitCondition = {
  constant?: number;
  comparator?: Comparator;
  first_signal?: Signal;
  second_signal?: Signal;
};
export type Tile = {
  name: string;
  position: Position;
};
export type Color = {
  /** red, number from 0 to 1. */
  r: number;
  /** green, number from 0 to 1. */
  g: number;
  /** blue, number from 0 to 1. */
  b: number;
  /** transparency, number from 0 to 1. */
  a: number;
};
export const OPERATOR = {
  division: '/',
  multiplication: '*',
  subtraction: '-',
  addition: '+',
  exponentiation: '^',
  modulo: '%',
  shiftRight: '>>',
  shiftLeft: '<<',
  binaryOr: 'OR',
  binaryAnd: 'AND',
  binaryXor: 'XOR',
} as const;

export type Operator = (typeof OPERATOR)[keyof typeof OPERATOR];
export type BlueprintType = {
  description?: string;
  'snap-to-grid'?: Position;
  'absolute-snapping'?: boolean;
  'position-relative-to-grid'?: Position;
  icons?: Icon[];
  entities?: Entity[];
  /** used with trains and cargo wagons */
  schedules?: Schedule[];
  /** used with trains and cargo wagons */
  stock_connections?: Array<{
    /** corresponding entity_number */
    stock: number;
    /** entity_number of the entity connected to the front */
    front?: number;
    /** entity_number of the entity connected to the back */
    back?: number;
  }>;
  tiles?: Tile[];
  /**
   * Format: [entity_number, wire_connector_id, entity_number, wire_connector_id]
   * @see https://lua-api.factorio.com/latest/defines.html#defines.wire_connector_id
   */
  wires?: [number, number, number, number][];
  item: 'blueprint';
  label?: string;
  label_color?: Color;
  version: number;
};
export type BlueprintBookPlan = Plan & {
  /** 0-based */
  index: number;
};
export type DeconstructionPlanner = {
  deconstruction_planner: {
    settings: null | {
      trees_and_rocks_only?: boolean;
      entity_filter_mode?: number;
      tile_filter_mode?: number;
      entity_filters?: {
        name: string;
        quality?: string;
        comparator?: Comparator;
        /** 0-based */
        index: number;
      }[];
      tile_selection_mode?: number;
      tile_filters?: {
        name: string;
        /** 0-based */
        index: number;
      }[];

      description?: string;
      icons?: Icon[];
    };
    item: 'deconstruction-planner';
    label?: string;
    version: number;
  };
};
export type UpgradePlanner = {
  upgrade_planner: {
    settings: null | {
      mappers: Array<{
        from?: {
          type: 'entity' | 'item';
          name: string;
          quality?: string;
          comparator?: Comparator;
          module_filter?: {
            name: string;
            quality?: string;
            comparator?: Comparator;
          };
        };
        to?: {
          type: 'entity' | 'item';
          name: string;
          quality?: string;
          module_limit: number;
          module_slots: Array<{
            name: string;
            quality?: string;
          }>;
        };
        /** 0-based */
        index: number;
      }>;
      icons?: Icon[];
      description?: string;
    };
    item: 'upgrade-planner';
    description?: string;
    label?: string;
    version: number;
  };
};
export type Plan =
  | BlueprintType
  | BlueprintBookType
  | DeconstructionPlanner
  | UpgradePlanner;

export type BlueprintBookType = {
  blueprints?: Array<BlueprintBookPlan>;
  item: 'blueprint-book';
  label?: string;
  description?: string;
  icons?: Icon[];
  /** 0-based */
  active_index: number;
  version: number;
};
