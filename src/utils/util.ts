export const checkValidation = (formData: any, eventForm: any[]) => {
  let newErrors: Record<string, string> = {};

  eventForm.forEach((element) => {
  
    if (!formData[element.name] || String(formData[element.name]).trim() === "") {
      newErrors[element.name] = `${element.label || element.name} is required`;
    }
    
    if (element.name === "end" && formData.start && formData.end) {
      const startDate = new Date(formData.start);
      const endDate = new Date(formData.end);
 
      if (startDate > endDate) {
        newErrors["end"] = "End date cannot before start date";
      }
    }
    // if (element.type === 'date'&& new Date(formData[element.name])<new Date()) {
    //   newErrors[element.name] = 'Date cannot be in the past'
    //   console.log('checked correcly')
    //  }
  });

  return newErrors;
};
    