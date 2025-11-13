import moment from 'moment'

const EventView = ({ selectedData, handleCloseModal, handleModal, onDeleteEvent }: any) => {

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this Event?')) {
            onDeleteEvent();
            handleCloseModal();
        } else {
            console.log('Deletion cancelled.')
        }
    }
    return (
        <div>
            <h2 className="header-title">Event Details</h2>
            <p><strong>Title:</strong> {selectedData?.title}</p>
            <p><strong>Description:</strong> {selectedData?.description}</p>
            <p><strong>Start:</strong> {moment(selectedData?.start).format('YYYY-MM-DD')}</p>
            <p><strong>End:</strong> {moment(selectedData?.end).format('YYYY-MM-DD')}</p>
            <div className="flex gap-4">
                <button onClick={handleCloseModal} className="btn bg-black text-white">Close</button>
                <button className="btn bg-blue-500 text-white" onClick={() => { handleModal(); handleCloseModal() }}>Edit</button>
                <button className="btn bg-red-500 text-white" onClick={() => { handleDelete() }}>Delete</button>
            </div>
        </div>
    )
}

export default EventView