import React, {useContext, useState} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ToastContext } from "../../../Context/ToastContext";
import {CategoryService} from "../../../service/CategoryService";

export default function CreateCategory  ({ onSuccess }) {
    const [categoryName, setCategoryName] = useState('');
    const { showToast } = useContext(ToastContext);


    const handleSubmit = async () => {
        if (!categoryName) {
            showToast('error', 'Valeur requise', 'Please enter a category name.');
            return;
        }

        try {
            const createdCategory = await CategoryService.createCategory(categoryName);
            showToast('success', 'Category Created', `The category ${createdCategory.name} was successfully created.`);
            onSuccess(createdCategory);
            setCategoryName(''); // Clear input after successful creation
        } catch (error) {
            showToast('error', 'Creation Failed', 'Failed to create category.');
        }
    };

    return (
        <div>
            <h3>Create New Category</h3>
            <div>
                <label htmlFor="categoryName">Category Name:</label>
                <InputText id="categoryName" value={categoryName}
                           onChange={(e) => setCategoryName(e.target.value)} />
            </div>
            <Button label="Create Category" onClick={handleSubmit} />
        </div>
    );
};


