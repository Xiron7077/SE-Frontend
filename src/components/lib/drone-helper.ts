import axios from 'axios';

const API_BASE_URL = 'http://192.168.8.130:3000/drone';

// Helper function for making API requests
async function makeRequest(method: 'get' | 'post', endpoint: string, data?: any) {
    try {
        const response = await axios[method](`${API_BASE_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error in ${method.toUpperCase()} request to ${endpoint}:`, error);
        throw error;
    }
}

// Drone Registration
export async function registerDrone(endpoint: string, uav_id: string) {
    return makeRequest('post', 'register', { endpoint, uav_id });
}

// Telemetry Updates
export async function sendTelemetry(id: string, telemetryData: TelemetryDto) {
    return makeRequest('post', `telemetry/${id}`, telemetryData);
}

// Get All Drones
export async function fetchAllDrones() {
    return makeRequest('get', '');
}

// Get Drone Mission
export async function fetchDroneMission(id: string) {
    return makeRequest('get', `${id}/mission`);
}

// Get Available Drones
export async function fetchAvailableDrones() {
    return makeRequest('get', 'available');
}

// Upload Mission
export async function uploadMission(id: string, missionData: MissionUploadDto) {
    return makeRequest('post', `${id}/mission/upload`, missionData);
}

// Send Command to Drone
export async function sendCommand(id: string, commandType: CommandType) {
    return makeRequest('post', `${id}/command`, { command_type: commandType });
}

// Type definitions that match your DTOs
interface LandingZoneDto {
    lat: number;
    lon: number;
    alt: number;
}

interface TelemetryDto {
    uav_id: string;
    location: LandingZoneDto;
    attitude: {
        roll: number;
        pitch: number;
        yaw: number;
    };
    mission_status: {
        status: string;
        code: number;
    };
    script_message: string;
    mav_message: string;
}

interface CommandDto {
    lat: number;
    lon: number;
    alt: number;
}

interface MissionResponseDto {
    commands: CommandDto[];
    dropoff_mission_index: number;
    pickup_mission_index: number;
}

interface MissionUploadDto {
    dropoff_mission_index: number;
    pickup_mission_index: number;
    waypoints: CommandDto[];
}

enum CommandType {
    MANUAL_OVERRIDE = 'manual_override',
    FLY_TO_LANDING_ZONE = 'fly_to_landing_zone',
    START_MISSION = 'start_mission',
    CONTINUE_MISSION = 'continue_mission',
}