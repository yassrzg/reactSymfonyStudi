import React, {useState, useEffect, useContext} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { UseTokenUser } from '../../../service/UseTokenUser';  // Make sure this is correctly imported
import { ToastContext } from "../../../Context/ToastContext";
import { Dialog } from 'primereact/dialog';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { showToast } = useContext(ToastContext);

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await UseTokenUser.getAllUsers();  // Assuming UserService.getUsers() fetches user data
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                showToast('error', 'Récupération des User Failed', 'Failed to get Users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const statusBodyTemplate = (rowData) => {
        return (
            <Tag value={rowData.verified ? 'Verified' : 'Not Verified'}
                 severity={rowData.verified ? 'success' : 'danger'} />
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger btn-delete-admin"
                    onClick={() => confirmDeleteUser(rowData)} />
        );
    };
    const confirmDeleteUser = (user) => {
        setSelectedUser(user);
        setDeleteDialogVisible(true);
    };

    const onDeleteUserConfirm = async () => {
        if (selectedUser) {
            try {
                await UseTokenUser.deleteUser(selectedUser.id);
                setUsers(users.filter(user => user.id !== selectedUser.id)); // Update local state
                showToast('success', 'User Deleted', 'User has been successfully deleted.');
            } catch (error) {
                showToast('error', 'Deletion Failed', 'Failed to delete the user.');
            }
        }
        setDeleteDialogVisible(false);
        setSelectedUser(null);
    };

    const renderDeleteDialog = () => {
        return (
            <Dialog visible={deleteDialogVisible} style={{ width: '450px' }}
                    header="Confirmer la suppression" modal footer={renderDeleteDialogFooter()}
                    onHide={() => setDeleteDialogVisible(false)}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                    <i className="pi pi-exclamation-triangle" style={{ fontSize: '2em', color: 'red', marginRight: '10px' }}></i>
                    <p>Are you sure you want to delete the user <strong>{selectedUser?.name} {selectedUser?.surname}</strong>?</p>
                </div>
                <p>La Suppression de <strong>{selectedUser?.name} {selectedUser?.surname}</strong> entrainera la suppression de tous ces Accompagnants.</p>
            </Dialog>
        );
    };

    const renderDeleteDialogFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => setDeleteDialogVisible(false)} className="p-button-text" autoFocus/>
                <Button label="Yes" icon="pi pi-check" severity={"danger"} onClick={onDeleteUserConfirm}  />
            </div>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false  // Use 24-hour clock format
        });
    };
    const onPageChange = (e) => {
        setFirst(e.first); // First row offset
        setRows(e.rows); // Number of rows per page
    };

    return (
        <div>
            {renderDeleteDialog()}
            <DataTable value={users} loading={loading} responsiveLayout="scroll"
                       paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10}
                       first={first} onPageChange={onPageChange}>
                <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" />
                <Column field="surname" header="Lastname" sortable filter filterPlaceholder="Search by lastname" />
                <Column field="user" header="Email" sortable filter filterPlaceholder="Search by email" />
                <Column field="created_at" header="Created At" body={(data) => formatDate(data.created_at)} sortable />
                <Column field="verified" header="Status" body={statusBodyTemplate} />
                <Column body={actionBodyTemplate} header="Actions" />
            </DataTable>
        </div>
    );
}
