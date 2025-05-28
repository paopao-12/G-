function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

exports.getFare = (req, res) => {
  const { lat1, lon1, lat2, lon2, passenger_type } = req.query;

  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return res.status(400).json({ error: "Missing coordinates." });
  }

  const distance = haversineDistance(+lat1, +lon1, +lat2, +lon2);
  const baseFare = 14;
  const extraPerKm = 1.8;

  const extraKm = Math.max(0, Math.ceil(distance - 4));
  let fare = baseFare + (extraKm * extraPerKm);

  const passengerType = (passenger_type || 'regular').toLowerCase();
  if (['student', 'pwd', 'senior'].includes(passengerType)) {
    fare *= 0.80;
  }

  // Round to the nearest 0.25
  fare = Math.round(fare * 4) / 4;

  res.json({
    distance: distance.toFixed(2),
    fare: fare.toFixed(2),
    passenger_type: passenger_type || 'regular'
  });
};
