import { useMemo, useState } from 'react';
import '../../styles/Admin/TransactionAdmin.css';
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
import DetailIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { Layout } from './layout';

  type Transactions = { 
    no: number;
    orderId: string;
    customer: string;
    status: string;
    amount: string;
  };
  
  const data: Transactions[] = [
    { no: 1, orderId: 'vwe4rtny8', customer: 'Bahri', status: 'Shipped', amount: 'IDR.130.000' },
    { no: 2, orderId: '0h7892fg4', customer: 'Zan', status: 'Being Shipped', amount: 'IDR.230.000' },
    { no: 3, orderId: '0n3c69457s', customer: 'Zafran', status: 'Waiting Transaction', amount: 'IDR.120.000' },
    ]

  const status = ['Waiting Transaction', 'Shipped', 'Being Shipped', 'Done' ];
  const Transactionlist = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
    
  const columns = useMemo<MRT_ColumnDef<Transactions>[]>(
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
        accessorKey: 'orderId',
        header: 'Order ID',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
        enableEditing: false,
        size: 80,
        muiEditTextFieldProps: {
            type: 'string',
            error: !!validationErrors?.state,
            helperText: validationErrors?.state,
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableEditing: true,
        size: 80,
        editVariant: 'select',
        editSelectOptions: status.map((status) => ({
          value: status,
          label: status,
        })),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        enableEditing: false,
        size: 80,
        muiEditTextFieldProps: {
          type: 'string',
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
  const handleCreateUser: MRT_TableOptions<Transactions>['onCreatingRowSave'] = async ({
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
  const handleSaveUser: MRT_TableOptions<Transactions>['onEditingRowSave'] = async ({
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
  const openDeleteConfirmModal = (row: MRT_Row<Transactions>) => {
    if (window.confirm('Are you sure you want to delete this Transaction?')) {
      deleteUser(row.original.orderId);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    positionActionsColumn:'last',
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal',  //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.orderId,
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

    // optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Detail Transaction</DialogTitle>
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
        <Tooltip title="Detail">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <DetailIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
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
        <div className='title-transaction'>
          <h1>Transactions</h1>
        </div>
        <div className='table-transaction'>
          <MaterialReactTable table={table} />
        </div>
      </Layout>)
};

//CREATE hook (post new Person to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Transactions) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo:Transactions) => {
      queryClient.setQueryData(
        ['users'],
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as Transactions[],
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery<Transactions[]>({
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
    mutationFn: async (user: Transactions) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: Transactions) => {
      queryClient.setQueryData(
        ['users'],
        (prevUsers: any) =>
          prevUsers?.map((prevUser: Transactions) =>
            prevUser.orderId === newUserInfo.orderId ? newUserInfo : prevUser,
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
          prevUsers?.filter((user: Transactions) => user.orderId !== userId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    < Transactionlist/>
  </QueryClientProvider>
);

export default ExampleWithProviders;

function validateUser(user: Transactions) {
  const errors : {[key: string]: string} = {};
  if (!user.orderId) {
    errors.orderId;
  }
  return errors;
}
