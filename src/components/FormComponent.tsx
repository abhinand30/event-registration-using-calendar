import React, { useState } from 'react'
import { toast } from 'react-toastify';

import { checkValidation } from '../utils/util';
import { eventForm } from "../utils/data";
import type { FormModalProps } from '../utils/types';
import moment from 'moment';

interface formProps {
    setEvents: React.Dispatch<React.SetStateAction<FormModalProps[]>>
    handleModal: () => void;
    selectedData: FormModalProps | null;
    events: FormModalProps[]
}
const FormComponent: React.FC<formProps> = ({ handleModal, setEvents, selectedData, events }) => {
    const [formData, setFormData] = useState<FormModalProps | {}>(selectedData || {});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const renderField = (field: any) => {
        switch (field.type) {
            case "textArea":
                return (
                    <textarea
                        rows={4}
                        placeholder={field.label}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className="border-1 p-1"
                    />
                );

            case "text":
            case "date":
                return (
                    <input
                        placeholder={field.label}
                        name={field.name}
                        value={field.type === 'date' ? moment(formData[field.name]??'').format('YYYY-MM-DD') : formData[field.name]}
                        type={field.type}
                        onChange={handleChange}
                        className="border-1 p-1"
                    />
                );
            default:
                return null;
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
        let newError: Record<string, string> = {};
        let newValue: Record<string, string | null> = {};
        newValue[name] = value;

        if (type === "date") {
            const selectedDate = new Date(value);
            if (selectedDate < new Date()) {
                newError[name] = "Date cannot in below of Current Date";
                newValue[name] = null;
            }
            const updatedForm = { ...formData, ...newValue };
            const startDate = updatedForm.start ? new Date(updatedForm.start) : null;
            const endDate = updatedForm.end ? new Date(updatedForm.end) : null;

            if (startDate && endDate && startDate > endDate) {
                newError["end"] = "End date cannot before start date";
                newValue["end"] = null;
            }
        }

        setErrors((prev) => ({ ...prev, ...newError }));
        setFormData((form) => ({ ...form, ...newValue }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = checkValidation(formData, eventForm);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const data = formData as FormModalProps;
        const newEvent = {
            id: selectedData?.id || events.length,
            title: data.title,
            description: data.description,
            start: new Date(data.start),
            end: new Date(data.end),
        };

        if (selectedData && selectedData.id) {
            setEvents((prev) => prev.map((event) => (
                event.id === selectedData.id ? newEvent : event
            )));
            toast.success('Event updated')
        } else {
            setEvents((prev) => [...prev, newEvent]);
            toast.success('Event created')
        }
        setFormData({});
        setErrors({});
        handleModal();
    };
    return (
        <div>

            <h2 className="header-title">{selectedData?'Update':'Create'} Event</h2>
            <form onSubmit={(e) => { handleSubmit(e) }} className="flex flex-col gap-2">
                {eventForm.map((form, index) => (
                    <div key={index} className='flex flex-col'>
                        <label id={form.name}>{form.label}</label>
                        {renderField(form)}
                        <p className="text-red-500"> {errors[form?.name]}</p>
                    </div>
                ))}
                <div className="flex gap-6">
                    <button onClick={handleModal} className="btn bg-black text-white">
                        Close
                    </button>
                    <button className="btn bg-blue-500 text-white" type="submit">
                        {selectedData?'Update':'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormComponent