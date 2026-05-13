CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  ident VARCHAR(50) UNIQUE NOT NULL,
  vin VARCHAR(50),
  channel_id INTEGER,
  codec_id INTEGER,
  protocol_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gps_positions (
  id SERIAL PRIMARY KEY,
  vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
  ident VARCHAR(50) NOT NULL,
  device_timestamp BIGINT NOT NULL,
  server_timestamp DOUBLE PRECISION,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  altitude FLOAT,
  speed FLOAT,
  direction FLOAT,
  hdop FLOAT,
  pdop FLOAT,
  satellites INTEGER,
  position_valid BOOLEAN,
  gnss_status BOOLEAN,
  gnss_state INTEGER,
  engine_ignition BOOLEAN,
  can_engine_ignition BOOLEAN,
  engine_rpm INTEGER,
  engine_temperature FLOAT,
  engine_motorhours FLOAT,
  vehicle_speed FLOAT,
  vehicle_mileage FLOAT,
  tracker_mileage FLOAT,
  fuel_level FLOAT,
  fuel_consumed FLOAT,
  throttle_level FLOAT,
  battery_voltage FLOAT,
  battery_current FLOAT,
  external_voltage FLOAT,
  gsm_signal INTEGER,
  gsm_mcc INTEGER,
  gsm_mnc INTEGER,
  gsm_operator_code VARCHAR(20),
  peer VARCHAR(50),
  movement_status BOOLEAN,
  sleep_mode INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vehicle_state (
  id SERIAL PRIMARY KEY,
  position_id INTEGER REFERENCES gps_positions(id) ON DELETE CASCADE,
  ident VARCHAR(50) NOT NULL,
  device_timestamp BIGINT NOT NULL,
  front_left_door BOOLEAN,
  front_right_door BOOLEAN,
  rear_left_door BOOLEAN,
  rear_right_door BOOLEAN,
  trunk BOOLEAN,
  hood BOOLEAN,
  roof_opened BOOLEAN,
  door_open BOOLEAN,
  driver_seatbelt BOOLEAN,
  driver_seatbelt_indicator BOOLEAN,
  front_passenger_seatbelt BOOLEAN,
  rear_left_seatbelt BOOLEAN,
  rear_right_seatbelt BOOLEAN,
  rear_central_seatbelt BOOLEAN,
  low_beam BOOLEAN,
  high_beam BOOLEAN,
  front_fog BOOLEAN,
  rear_fog BOOLEAN,
  parking_lights BOOLEAN,
  hazard_lights BOOLEAN,
  additional_front_lights BOOLEAN,
  additional_rear_lights BOOLEAN,
  light_signal BOOLEAN,
  drive_gear BOOLEAN,
  neutral_gear BOOLEAN,
  reverse_gear BOOLEAN,
  parking_status BOOLEAN,
  handbrake BOOLEAN,
  handbrake_indicator BOOLEAN,
  pedal_brake BOOLEAN,
  pedal_clutch BOOLEAN,
  front_passenger_present BOOLEAN,
  operator_present BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS can_flags (
  id SERIAL PRIMARY KEY,
  position_id INTEGER REFERENCES gps_positions(id) ON DELETE CASCADE,
  ident VARCHAR(50) NOT NULL,
  device_timestamp BIGINT NOT NULL,
  check_engine BOOLEAN,
  warning_indicator BOOLEAN,
  stop_indicator BOOLEAN,
  oil_pressure_indicator BOOLEAN,
  battery_indicator BOOLEAN,
  coolant_level_low BOOLEAN,
  fuel_level_low BOOLEAN,
  tire_pressure_low BOOLEAN,
  wear_brake_pads BOOLEAN,
  soot_filter BOOLEAN,
  maintenance_required BOOLEAN,
  abs_failure BOOLEAN,
  airbag_indicator BOOLEAN,
  esp_indicator BOOLEAN,
  eps_indicator BOOLEAN,
  lights_failure BOOLEAN,
  glow_plug_indicator BOOLEAN,
  ready_to_drive BOOLEAN,
  esp_status BOOLEAN,
  cruise_status BOOLEAN,
  air_condition BOOLEAN,
  pto_status BOOLEAN,
  webasto_status BOOLEAN,
  cng_status BOOLEAN,
  motor_status BOOLEAN,
  engine_lock BOOLEAN,
  engine_working BOOLEAN,
  dynamic_ignition BOOLEAN,
  ignition_key BOOLEAN,
  electronic_power_control BOOLEAN,
  interlock_active BOOLEAN,
  standalone_engine BOOLEAN,
  private_status BOOLEAN,
  front_differential BOOLEAN,
  rear_differential BOOLEAN,
  central_diff_4hi BOOLEAN,
  central_diff_4lo BOOLEAN,
  automatic_retarder BOOLEAN,
  manual_retarder BOOLEAN,
  factory_armed BOOLEAN,
  factory_alarm_actuated BOOLEAN,
  factory_alarm_emulated BOOLEAN,
  immobilizer_keys BOOLEAN,
  immobilizer_service BOOLEAN,
  car_closed BOOLEAN,
  car_closed_remote BOOLEAN,
  trailer_axle_lift_1 BOOLEAN,
  trailer_axle_lift_2 BOOLEAN,
  vehicle_battery_charging BOOLEAN,
  can_module_sleep BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gps_positions_ident ON gps_positions(ident);
CREATE INDEX IF NOT EXISTS idx_gps_positions_device_timestamp_desc ON gps_positions(device_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_gps_positions_vehicle_id ON gps_positions(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_gps_positions_lat_lng ON gps_positions(latitude, longitude);

CREATE INDEX IF NOT EXISTS idx_vehicle_state_ident ON vehicle_state(ident);
CREATE INDEX IF NOT EXISTS idx_vehicle_state_position_id ON vehicle_state(position_id);

CREATE INDEX IF NOT EXISTS idx_can_flags_ident ON can_flags(ident);
CREATE INDEX IF NOT EXISTS idx_can_flags_position_id ON can_flags(position_id);

DROP TRIGGER IF EXISTS set_vehicles_updated_at ON vehicles;
CREATE TRIGGER set_vehicles_updated_at
BEFORE UPDATE ON vehicles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
