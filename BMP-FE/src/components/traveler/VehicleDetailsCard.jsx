import { FaTruck, FaCar, FaMotorcycle, FaPlane, FaBus } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";

const labelCls = "text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-1 block";
const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
const VEHICLE_TYPES = ["Bike", "Car", "SUV", "Van", "Truck"];

const InfoRow = ({ label, value, bg = "bg-gray-50", border = "" }) => (
  <div className={`${bg} ${border} rounded-lg p-3`}>
    <label className={labelCls}>{label}</label>
    <p className="font-semibold text-sm text-gray-800 mt-1">{value || "—"}</p>
  </div>
);

export default function VehicleDetailsCard({ d, isEditing, setField }) {
  const mode = d.transport_mode || d.transportMode;
  const transitType = d.transitDetails?.type || d.transit_details?.type;
  const isPrivate = !mode || mode === "private";
  const isBus = transitType === "bus";
  const isTrain = transitType === "train";
  const isPlane = transitType === "plane";

  // Determine vehicle type display - for public transport modes, show the transit type
  const displayVehicleType = d.vehicleDetails?.vehicleType ?? d.vehicle ?? "";
  const vehicleTypeIsPublic = displayVehicleType === "plane" || displayVehicleType === "bus" || displayVehicleType === "train";
  const td = d.transit_details || d.transitDetails;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
<h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
        {isBus ? <FaBus className="text-blue-500" /> : isTrain ? <FaTrainSubway className="text-red-500" /> : isPlane ? <FaPlane className="text-blue-500" /> : <FaTruck className="text-purple-500" />} Vehicle Details
        </h2>
      <div className="space-y-3">

        <InfoRow label="Transport Mode" value={<span className="capitalize">{mode || "Private"}</span>} />

        <div className="bg-gray-50 rounded-lg p-3">
          <label className={labelCls}>Vehicle Type</label>
{isEditing ? (
             <select className={inputCls} value={d.vehicleDetails?.vehicleType ?? ""} onChange={(e) => setField("vehicleDetails.vehicleType", e.target.value)}>
               {VEHICLE_TYPES.map((v) => <option key={v} value={v}>{v}</option>)}
             </select>
           ) : (
             <div className="flex items-center gap-2 mt-1">
               {(() => {
                 const vt = displayVehicleType.toLowerCase();
                 if (vt === "bike" || vt === "motorcycle") return <FaMotorcycle className="text-blue-500" />;
                 if (vt === "truck") return <FaTruck className="text-orange-500" />;
                 if (vt === "plane") return <FaPlane className="text-blue-500" />;
                 if (vt === "bus") return <FaBus className="text-blue-500" />;
                 if (vt === "train") return <FaTrainSubway className="text-red-500" />;
                 return <FaCar className="text-red-500" />;
               })()}
               <span className="font-semibold text-sm text-gray-800 capitalize">{vehicleTypeIsPublic ? displayVehicleType.charAt(0).toUpperCase() + displayVehicleType.slice(1) : (d.vehicleDetails?.vehicleType ?? d.vehicle ?? "—")}</span>
             </div>
           )}
        </div>

        {isPrivate && (
          <div className="bg-gray-50 rounded-lg p-3">
            <label className={labelCls}>Vehicle Number</label>
            {isEditing ? (
              <input className={inputCls} value={d.vehicleDetails?.vehicleNumber ?? ""} placeholder="e.g. MH-02-AX-1234" onChange={(e) => setField("vehicleDetails.vehicleNumber", e.target.value)} />
            ) : (
              <p className="font-semibold text-sm text-gray-800 mt-1">{d.vehicleDetails?.vehicleNumber ?? "N/A"}</p>
            )}
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-3">
          <label className={labelCls}>Max Weight Capacity</label>
          {isEditing ? (
            <input className={inputCls} value={d.vehicleDetails?.maxWeightCapacity ?? ""} placeholder="e.g. 25 kg" onChange={(e) => setField("vehicleDetails.maxWeightCapacity", e.target.value)} />
          ) : (
            <p className="font-semibold text-sm text-gray-800 mt-1">{d.vehicleDetails?.maxWeightCapacity ?? d.weight ?? "—"}</p>
          )}
        </div>

        {isBus && td && (
          <>
            <InfoRow label="🚌 Bus Service Name" value={td.service_name || td.busServiceName} bg="bg-blue-50" border="border border-blue-100" />
            <InfoRow label="Bus Number" value={td.bus_number || td.busNumber || "(Not specified)"} bg="bg-blue-50" border="border border-blue-100" />
          </>
        )}

{isTrain && td && (
           <>
             <InfoRow label="🚂 Train Number" value={td.train_number || td.trainNumber} bg="bg-red-50" border="border border-red-100" />
             <InfoRow label="Train Name" value={td.train_name || td.trainName} bg="bg-red-50" border="border border-red-100" />
             <InfoRow label="Class Type" value={(td.class_type || td.classType || "—").toUpperCase()} bg="bg-red-50" border="border border-red-100" />
             {(td.has_reservation || td.hasReservation) && (
               <>
                 <InfoRow label="PNR Number" value={td.pnr_number || td.pnrNumber} bg="bg-red-50" border="border border-red-100" />
                 <InfoRow label="Seat Numbers" value={td.seat_numbers || td.seatNumbers} bg="bg-red-50" border="border border-red-100" />
               </>
             )}
           </>
         )}

         {isPlane && td && (
           <>
             <InfoRow label="✈️ Airline Name" value={td.airline_name || td.planeAirlineName} bg="bg-blue-50" border="border border-blue-100" />
             <InfoRow label="Flight Number" value={td.flight_number || td.planeFlightNumber || "(Not specified)"} bg="bg-blue-50" border="border border-blue-100" />
             <InfoRow label="Baggage Type" value={(td.baggage_type || td.planeBaggageType || "—").toUpperCase()} bg="bg-blue-50" border="border border-blue-100" />
           </>
         )}
       </div>
    </div>
  );
}
