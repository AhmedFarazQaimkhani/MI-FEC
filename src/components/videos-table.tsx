// Packages
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';

// Components
import { Button } from './button';
import { ConfirmationDialog } from './confirm-dialog';

// Routes
import { routeConstantsService } from '../services/routes';

// Interfaces
import { ProcessedVideo } from '../common/interfaces';

type VideosTableProps = {
  videos: ProcessedVideo[];
  setVideos: any;
};

export const VideosTable = ({ videos, setVideos }: VideosTableProps) => {
  // Hooks
  const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<number>(0);
  const navigate = useNavigate();

  // Confirmation dialog text
  const confirmationMessage = 'Do you really want to delete it?';
  const confirmationTitle = 'Delete';

  // Confirmation diaglog when user try to delete a video
  const openConfirmDialog = (id: number) => {
    setVideoId(id);
    setShowConfirmationDialog(!showConfirmationDialog);
  };

  /**
   * No functionilty provided by json-server to delete nested data
   * So I applied delete manually on state to show delete operation
   */
  const handleDelete = () => {
    const updatedList = videos.filter((video: any) => {
      return video.id !== videoId;
    });
    setVideos(updatedList);
  };

  // redirects to edit video
  const editVideo = (authorId: number, videoId: number) => {
    navigate(routeConstantsService.unAuthenticatedRoutes.editVideo.path.replace(':id', videoId.toString()), { state: { authorId } });
  };
  // Columns
  const columns: GridColDef[] = [
    {
      field: 'video',
      headerName: 'Video name',
      sortable: true,
      width: 240,
      valueGetter: (params: GridValueGetterParams) => `${params.row.name || ''}`,
    },
    {
      field: 'author',
      headerName: 'Author',
      sortable: true,
      width: 240,
      valueGetter: (params: GridValueGetterParams) => `${params.row.author.name || ''}`,
    },
    {
      field: 'category',
      headerName: 'Catoregories',
      sortable: true,
      width: 240,
      valueGetter: (params: GridValueGetterParams) => `${params.row.categories.join(',') || ''}`,
    },
    {
      field: 'rowformat',
      headerName: 'Format',
      sortable: true,
      width: 240,
      valueGetter: (params: GridValueGetterParams) => `${params.row.formats.res || ''}`,
    },
    {
      field: 'releaseDate',
      headerName: 'Release Date',
      sortable: true,
      width: 240,
      valueGetter: (params: GridValueGetterParams) => `${params.row.releaseDate || ''}`,
    },
    {
      field: 'option',
      headerName: 'Options',
      width: 240,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Button secondary onClick={() => editVideo(params.row.author.id, params.row.id)}>
            Edit
          </Button>
          <Button danger onClick={() => openConfirmDialog(params.row.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  return (
    <Box sx={{ height: 420, width: '100%', p: 2 }}>
      {/** Search, Filter and Sort Included inside the grid */}{' '}
      <DataGrid
        rows={videos}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
      <ConfirmationDialog
        isOpen={showConfirmationDialog}
        setIsOpen={setShowConfirmationDialog}
        submitHandler={handleDelete}
        message={confirmationMessage}
        title={confirmationTitle}
      />
    </Box>
  );
};
