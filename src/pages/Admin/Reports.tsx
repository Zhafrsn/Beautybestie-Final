import { useMemo, useState } from 'react';
import '../../styles/Admin/ReportsAdmin.css';
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

  type Reports = { 
    no: number;
    invoice: string;
    date: string;
    customer: string;
    amount: string;
    discount: string;
    grandTotal: string;
  };
  
  const data: Reports[] = [
    { no: 1, invoice: 'YP2302040001', date: '04/02/2023', customer: 'Annisa Raulita', amount: 'IDR.24.000', discount: 'IDR.0', grandTotal: 'IDR.24.000' },
    { no: 2, invoice: 'YP2302040002', date: '04/02/2023', customer: 'Misnawati', amount: 'IDR.59.000', discount: 'IDR.2.000', grandTotal: 'IDR.57.000' },
    { no: 3, invoice: 'YP2302040003', date: '04/02/2023', customer: 'Nadya Petroya', amount: 'IDR.122.000', discount: 'IDR.15.000', grandTotal: 'IDR.107.000' },
    { no: 4, invoice: 'YP2302050001', date: '05/02/2023', customer: 'Zhafran Zaky', amount: 'IDR.20.500', discount: 'IDR.1.000', grandTotal: 'IDR.19.500' },
    { no: 5, invoice: 'YP2302050002', date: '05/02/2023', customer: 'Fauzan Agung', amount: 'IDR.150.000', discount: 'IDR.30.000', grandTotal: 'IDR.120.000' },
    { no: 6, invoice: 'YP2302050003', date: '05/02/2023', customer: 'Bahri Syahputra', amount: 'IDR.40.000', discount: 'IDR.0', grandTotal: 'IDR.40.000' },
    ]

  const Transactionlist = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
    
  const columns = useMemo<MRT_ColumnDef<Reports>[]>(
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
        accessorKey: 'invoice',
        header: 'Invoice',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        enableEditing: false,
        size: 80,
        muiEditTextFieldProps: {
            type: 'string',
            error: !!validationErrors?.state,
            helperText: validationErrors?.state,
        },
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
        accessorKey: 'amount',
        header: 'Amount',
        enableEditing: true,
        size: 80,
        muiEditTextFieldProps: {
          type: 'string',
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
      {
        accessorKey: 'discount',
        header: 'Discount',
        enableEditing: true,
        size: 80,
        muiEditTextFieldProps: {
          type: 'string',
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
      {
        accessorKey: 'grandTotal',
        header: 'Grand Total',
        enableEditing: true,
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
  const handleCreateUser: MRT_TableOptions<Reports>['onCreatingRowSave'] = async ({
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
  const handleSaveUser: MRT_TableOptions<Reports>['onEditingRowSave'] = async ({
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
  const openDeleteConfirmModal = (row: MRT_Row<Reports>) => {
    if (window.confirm('Are you sure you want to delete this Reports?')) {
      deleteUser(row.original.invoice);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    positionActionsColumn:'last',
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal',  //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.invoice,
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
        <DialogTitle variant="h5">Detail Reports</DialogTitle>
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
        <div className='title-reports'>
          <h1>Reports</h1>
        </div>
        <div className='table-reports'>
          <MaterialReactTable table={table} />
        </div>
      </Layout>)
};

//CREATE hook (post new Person to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Reports) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo:Reports) => {
      queryClient.setQueryData(
        ['users'],
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as Reports[],
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery<Reports[]>({
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
    mutationFn: async (user: Reports) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: Reports) => {
      queryClient.setQueryData(
        ['users'],
        (prevUsers: any) =>
          prevUsers?.map((prevUser: Reports) =>
            prevUser.invoice === newUserInfo.invoice ? newUserInfo : prevUser,
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
          prevUsers?.filter((user: Reports) => user.invoice !== userId),
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

function validateUser(user: Reports) {
  const errors : {[key: string]: string} = {};
  if (!user.invoice) {
    errors.invoice;
  }
  return errors;
}
