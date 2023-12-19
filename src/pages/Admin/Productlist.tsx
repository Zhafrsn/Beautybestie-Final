/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from 'react';
import '../../styles/Admin/ProductAdmin.css';
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

  type Person = { 
    no: number;
    id: string;
    product: string;
    stock: number;
    category: string;
  };
  
  const data: Person[] = [
    { no: 1, id: 'kajsahifa', product: 'Emina Bright Stuff Toner', stock: 10, category: 'Toner' },
    { no: 2, id: 'fanjnfka', product: 'Emina Bright Stuff Masker', stock: 20, category: 'Masker' },
    { no: 3, id: 'kajsdnjsa', product: 'Emina Bright Stuff Sunscreen', stock: 30, category: 'Sunscreen' },
    { no: 4, id: 'kasjfjai', product: 'Emina Bright Stuff Lipcare', stock: 40, category: 'Lipcare' },
    { no: 5, id: 'dkklakf', product: 'Emina Bright Stuff Serum', stock: 50, category: 'Serum' },
    ]
  const categories = ['Toner', 'Masker', 'Sunscreen', 'Lipcare', 'Serum', 'Facewash', 'Moisturizer'];
  const Productlist = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
    
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
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
        accessorKey: 'id',
        header: 'ID Product',
        enableEditing: true,
        size: 80,
      },
      {
        accessorKey: 'product',
        header: 'Product Item',
        enableEditing: true,
        size: 80,
        onFocus: () =>
        setValidationErrors({
          ...validationErrors,
          Product: undefined,
        }),
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        enableEditing: true,
        size: 80,
        muiEditTextFieldProps: {
          type: 'number',
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
        onFocus: () =>
        setValidationErrors({
          ...validationErrors,
          Stock: undefined,
        }),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        enableEditing: true,
        size: 80,
        editVariant: 'select',
        editSelectOptions: categories.map((category) => ({
          value: category,
          label: category,
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
  const handleCreateUser: MRT_TableOptions<Person>['onCreatingRowSave'] = async ({
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
  const handleSaveUser: MRT_TableOptions<Person>['onEditingRowSave'] = async ({
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
  const openDeleteConfirmModal = (row: MRT_Row<Person>) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    positionActionsColumn:'last',
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal',  //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
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
        <DialogTitle variant="h5">Add Product</DialogTitle>
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
        <DialogTitle variant="h5">Edit User</DialogTitle>
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
        Add Product
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
        <div className='title'>
          <h1>Product List</h1>
        </div>
        <div className='table'>
          <MaterialReactTable table={table} />
        </div>
      </Layout>)
};

//CREATE hook (post new Person to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Person) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo:Person) => {
      queryClient.setQueryData(
        ['users'],
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as Person[],
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery<Person[]>({
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
    mutationFn: async (user: Person) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: Person) => {
      queryClient.setQueryData(
        ['users'],
        (prevUsers: any) =>
          prevUsers?.map((prevUser: Person) =>
            prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
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
          prevUsers?.filter((user: Person) => user.id !== userId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    < Productlist/>
  </QueryClientProvider>
);

export default ExampleWithProviders;

function validateUser(user: Person) {
  const errors : {[key: string]: string} = {};
  if (!user.stock) {
    errors.stock = "stock is required";
  }
  return errors;
}

