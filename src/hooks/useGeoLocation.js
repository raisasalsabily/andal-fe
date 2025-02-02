import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

// Instance axios untuk Google Maps API tanpa header Authorization
export const axiosGoogleMaps = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
    address: '',
    error: null,
    gpsActive: 'Mengecek status...',
    batteryStatus: 0
  });

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axiosGoogleMaps.get('/geocode/json', {
        params: {
          latlng: `${lat},${lng}`,
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        }
      });
      console.log('Geocoding response:', response.data);
      if (response.data.results && response.data.results.length > 0) {
        return response.data.results[0].formatted_address || 'Alamat tidak ditemukan';
      } else {
        return 'Alamat tidak ditemukan';
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Eror mencari alamat';
    }
  };

  const onSuccess = useCallback(async (position) => {
    const { latitude, longitude } = position.coords;

    const address = await fetchAddress(latitude, longitude);
    const batteryStatus = await getBatteryPercentage();

    const newLocation = {
      loaded: true,
      coordinates: {
        lat: latitude,
        lng: longitude
      },
      address: address,
      gpsActive: true,
      batteryStatus: batteryStatus
    };
    setLocation(newLocation);
    console.log('New location:', newLocation);

    // Kirim data ke endpoint API
    postDataToAPI({
      latitude: latitude,
      longitude: longitude,
      gps: true,
      battery: batteryStatus.toString() // Ensure batteryStatus is a string
    });
  }, []);

  const onError = useCallback((error) => {
    const newLocation = {
      loaded: true,
      error,
      gpsActive: false,
      batteryStatus: '0',
      coordinates: { lat: null, lng: null }
    };

    setLocation(newLocation);
    console.error('Error getting location:', error);
  }, []);

  const getBatteryPercentage = async () => {
    if ('getBattery' in navigator) {
      const battery = await navigator.getBattery();
      return (battery.level * 100).toString();
    } else {
      console.error('Status baterai tidak dapat diakses pada browser ini');
      return '0';
    }
  };

  const postDataToAPI = async (data) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}location/send-location`, data).then((response) => {
        console.log('Location posted successfully', response.data);
      });
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Terjadi kesalahan. Coba cek koneksi internet Anda.');
      }
    }
  };

  const fetchLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation tidak didukung'
      });
      return;
    }

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, geoOptions);
  }, [onError, onSuccess]);

  useEffect(() => {
    fetchLocation();
    // const intervalId = setInterval(fetchLocation, 10000); // Interval 10 detik
    // return () => clearInterval(intervalId);
  }, [fetchLocation]);

  return { location, fetchLocation };
};

export default useGeoLocation;
