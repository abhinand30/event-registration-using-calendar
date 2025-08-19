import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";

import FormModal from "../components/FormModal";
import FormComponent from "../components/FormComponent";
import EventView from "../components/EventView";
import type { FormModalProps } from "../utils/types";
import { ToastContainer } from "react-toastify";

const event = [
    {
        id: 1,
        'title': 'All Day Event very long title',
        description: 'ajajajajajajajjajaajjajajajajaj',
        'start': '2025-08-15',
        'end': '2025-08-16',
    },
    {
        id: 2,
        'title': 'Long Event',
        description: 'ajajajajajajajjajaajjajajajajaj',
        'start': '2025-08-25',
        'end': '2025-08-30'
    },
    {
        id: 3,
        'title': 'Ldodododo',
        description: 'ajajajajajajajjajaajjajajajajaj',
        'start': '2025-08-25',
        'end': '2025-08-30'
    },
    {
        id: 4,
        'title': 'hdhdhdhg',
        description: 'ajajajajajajajjajaajjajajajajaj',
        'start': '2025-08-25',
        'end': '2025-08-30'
    },
];



const CalendarEvents = () => {
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState<any>(event);
    const [showFormModal, setShowFormModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedData, setSelectedData] = useState<FormModalProps | null>(null);
    const [currentDate,setCurrentDate]=useState<Date>(new Date);

    const handleModal = () => {
        setShowFormModal(!showFormModal);
        setSelectedData(null);
    };

    const handleViewModal = () => {
        setShowViewModal(!showViewModal);
    };
  
     const onDeleteEvent=()=>{
        setEvents((prev:FormModalProps[])=>prev.filter((event)=>event.id!==selectedData?.id))
     }
    return (
        <div>
             <ToastContainer/>
            <button className="btn bg-black text-white mb-2" onClick={()=>{handleModal();}}>
                Add Events
            </button>
            <Calendar
                localizer={localizer}
                events={events}
                view="month"
                views={["month"]}
                startAccessor="start"
                date={currentDate}
                endAccessor="end"
                style={{ height: 500, width: 700 }}
                popup
                onSelectEvent={(event) => {setSelectedData(event);handleViewModal() }}
                onNavigate={(date) => setCurrentDate(date)}
            />

            {showFormModal && (
                <FormModal onClose={handleModal}>
                    <FormComponent handleModal={handleModal} setEvents={setEvents} selectedData={selectedData} events={events} />
                </FormModal>
            )}
            {showViewModal && (
                <FormModal onClose={handleViewModal}>
                    <EventView selectedData={selectedData} setSelectedData={setSelectedData} onDeleteEvent={onDeleteEvent} handleModal={()=>setShowFormModal(!showFormModal)} handleCloseModal={handleViewModal} />
                </FormModal>
            )}
        </div>

    );
};

export default CalendarEvents;