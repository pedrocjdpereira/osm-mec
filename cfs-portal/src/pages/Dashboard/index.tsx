import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAppPkg, getAppI } from '../../api/api';
import { AppData, InstanceData } from '../../types/Component';
import toast from '../../utils/toast';
import InstanceGrid from '../../components/InstanceGrid';

const appColumns: GridColDef[] = [
    { field: 'info-name', headerName: 'Name', flex: 1 },
    { field: 'provider', headerName: 'Provider', flex: 1 },
    { field: 'version', headerName: 'Version', flex: 1 },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const navigateToAppCatalog = () => { navigate('/app-catalog'); }
    const navigateToAppInstances = () => { navigate('/app-instances'); }

    const [appData, setAppData] = useState<AppData[]>([]);
    const [instanceCount, setInstanceCount] = useState<Number>(0);

    useEffect(() => {
        getAppData()
    }, []);

    const getAppData = async () => {
        try {
            const { data } = await getAppPkg();
            setAppData(data);
        } catch (error) {
            setAppData([]);
            toast.error('Error fetching app data');
        }
    };

    const handleInstanceCount = (count: number) => {
        setInstanceCount(count);
    }

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb='20px'>
                <Typography fontWeight='400' variant="h4">
                    Dashboard
                </Typography>
            </Box>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Card sx={{ borderRadius: '6px', boxShadow: '6', cursor: 'pointer' }} onClick={navigateToAppCatalog}>
                            <CardHeader
                                title={
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h5">
                                            App Catalog
                                        </Typography>
                                        <Typography variant="h5" sx={{ marginLeft: 'auto' }}>
                                            {`${appData.length}`}
                                        </Typography>
                                    </Box>
                                }
                            />
                            <CardContent>
                                <DataGrid
                                    rows={appData}
                                    columns={appColumns}
                                    disableRowSelectionOnClick
                                    disableColumnMenu
                                    hideFooter
                                    sx={{
                                        "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus": {
                                            outline: 'none',
                                        },
                                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                            outline: "none !important",
                                        },
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card sx={{ borderRadius: '6px', boxShadow: '6', cursor: 'pointer' }} onClick={navigateToAppInstances}>
                            <CardHeader
                                title={
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h5">
                                            App Instances
                                        </Typography>
                                        <Typography variant="h5" sx={{ marginLeft: 'auto' }}>
                                            {instanceCount.toString()}
                                        </Typography>
                                    </Box>
                                }
                            />
                            <CardContent>
                                <InstanceGrid minimalConfig instanceCount={handleInstanceCount} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box >
        </>
    );
}

export default Dashboard;