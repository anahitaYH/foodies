'use server'

export  async function shareMeal(formData){
    const meal = {
      title: formData.get('title'),
      summery: formData.get('summery'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creato: formData.get('name'),
      creator_email: formData.get('email')
    }
  }