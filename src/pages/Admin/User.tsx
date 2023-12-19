import { useMemo, useState } from 'react';
import '../../styles/Admin/UserAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
  MRT_Table,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Layout } from './layout';

  type Users = { 
    no: number;
    username: string;
    name: string;
    address: string;
    level: string;
  };
  
  const data: Users[] = [
    { no: 1, username: 'SuperAdmin', name: 'Misna', address: 'Samata', level: 'Super Admin' },
    { no: 2, username: 'Admin1', name: 'Nadya', address: 'Hertasning', level: 'Admin', },
    { no: 3, username: 'Admin2', name: 'Annisa', address: 'Gowa', level: 'Admin', },
    { no: 4, username: 'Admin3', name: 'Zhafran', address: 'Pettarani', level: 'Admin', },
    { no: 5, username: 'Admin4', name: 'Zan', address: 'Urip', level: 'Admin', },
    { no: 6, username: 'Admin5', name: 'Bahri', address: 'Antang', level: 'Admin', },
    ]

  const level = ['Super Admin', 'Admin'];
  const Userlist = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
    
  const columns = useMemo<MRT_ColumnDef<Users>[]>(
    () => [
      {
        accessorKey: 'no',
        header: 'No',
        enableEditing: true,
        size: 80,
        sortType: 'basic',
        muiEditTextFieldProps: {
          type: 'number',
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
      {
        accessorKey: 'username',
        header: 'Username',
        enableEditing: true,
        size: 80,
        muiEditTextFieldProps: {
            type: 'string',
            error: !!validationErrors?.state,
            helperText: validationErrors?.state,
        },
      },
      {
        accessorKey: 'name',
        header: 'Admin Name',
        enableEditing: true,
        size: 80,
        muiEditTextFieldProps: {
            type: 'string',
            error: !!validationErrors?.state,
            helperText: validationErrors?.state,
        },
      },
      {
        accessorKey: 'address',
        header: 'Address',
        enableEditing: true,
        size: 80,
        muiEditTextFieldProps: {
          type: 'string',
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
      {
        accessorKey: 'level',
        header: 'Level',
        enableEditing: true,
        size: 80,
        editVariant: 'select',
        editSelectOptions: level.map((level) => ({
          value: level,
          label: level,
        })),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
    ],
    [validationErrors],
    );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();

  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();

  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();

  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser: MRT_TableOptions<Users>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<Users>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<Users>) => {
    if (window.confirm('Are you sure you want to delete this Admin User?')) {
      deleteUser(row.original.username);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    positionActionsColumn:'last',
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal',  //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.username,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: 'max-content',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Add Admin</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%'}}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions sx={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Edit Admin User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem'}}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem', justifySelf:'flex-end' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        style={{
          backgroundColor: '#ECA4B0', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', marginBottom:'1rem'}}
        variant='contained'
        onClick={() => {
          table.setCreatingRow(true); 
        }}
      >
        <FontAwesomeIcon icon={faPlus} className='admin-product__plus-icon'/>
        Add Admin
      </Button>
    ),

    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });
  
    return (
      <Layout>
        <div className='title-adm'>
          <h1>Admin User List</h1>
        </div>
        <div className='table-adm'>
          <MaterialReactTable table={table} />
        </div>
      </Layout>)
};

//CREATE hook (post new Person to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Users) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo:Users) => {
      queryClient.setQueryData(
        ['users'],
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as Users[],
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery<Users[]>({
    queryKey: ['users'],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(data);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Users) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: Users) => {
      queryClient.setQueryData(
        ['users'],
        (prevUsers: any) =>
          prevUsers?.map((prevUser: Users) =>
            prevUser.username === newUserInfo.username ? newUserInfo : prevUser,
          ),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId: string) => {
      queryClient.setQueryData(
        ['users'],
        (prevUsers: any) =>
          prevUsers?.filter((user: Users) => user.username !== userId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    < Userlist/>
  </QueryClientProvider>
);

export default ExampleWithProviders;

function validateUser(user: Users) {
  const errors : {[key: string]: string} = {};
  if (!user.username) {
    errors.username;
  }
  return errors;
}
