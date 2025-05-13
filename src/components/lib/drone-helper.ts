import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_DRONE_URL;

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
export async function sendCommand(id: string, commandType: string) {
    return makeRequest('post', `${id}/command`, { command_type: commandType });
}


export interface CommandDto {
    lat: number;
    lon: number;
    alt: number;
}

export interface MissionUploadDto {
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
