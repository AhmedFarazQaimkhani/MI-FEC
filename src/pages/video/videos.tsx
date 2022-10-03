// Packages
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Components
import { PageHeader } from '../../components/pageHeader/page-header';
import { Table } from '../../components/table/table';
import { ConfirmationDialog } from '../../components/dialog/confirm-dialog';
import { Button } from '../../components/button/button';

// Interfaces
import { Column, ProcessedVideo } from '../../common/interfaces';

// Services
import { getVideos } from '../../services/videos/videos';
import { routeConstantsService } from './../../services/routes/constants';

export const Videos = () => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const navigate = useNavigate();
  // Hooks
  const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<number>(0);

  // Confirmation dialog text
  const confirmationMessage = 'Do you really want to delete it?';
  const confirmationTitle = 'Delete';

  // Calls api from server
  useEffect(() => {
    getVideos().then(setVideos);
  }, [setVideos]);

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
    toast.success('Video Deleted Successfully');
  };

  // redirects to edit video page
  const editVideo = (authorId: number, videoId: number) => {
    navigate(routeConstantsService.unAuthenticatedRoutes.editVideo.path.replace(':id', videoId.toString()), { state: { authorId } });
  };

  // redirects to add video page
  const handleAddVideo = () => {
    navigate(routeConstantsService.unAuthenticatedRoutes.createVideo.path);
  };

  // Columns
  const columns: Column[] = [
    {
      accessor: 'name',
      label: 'Video name',
      sortable: true,
    },
    {
      accessor: 'author.name',
      label: 'Author',
      sortable: true,
    },
    {
      accessor: 'categories',
      label: 'Category name',
      sortable: true,
      renderCell: (params: any) => params.categories.join(','),
    },
    {
      accessor: 'formats.res',
      label: 'High quality format',
      sortable: true,
    },
    {
      accessor: 'releaseDate',
      label: 'Release Date',
      sortable: true,
    },
    {
      accessor: 'options',
      sortable: false,
      label: 'Options',
      renderCell: (params: any) => {
        return (
          <>
            <Button secondary onClick={() => editVideo(params.author.id, params.id)}>
              Edit
            </Button>
            <Button danger onClick={() => openConfirmDialog(params.id)}>
              Delete
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      {/* Page Title  */}
      <PageHeader title={'Ahmed Faraz Frontend Challenge'} handler={handleAddVideo} buttonText={'Add Video'} />

      {/* Videos Table */}
      {videos?.length > 0 && <Table data={videos} columns={columns} />}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmationDialog}
        setIsOpen={setShowConfirmationDialog}
        submitHandler={handleDelete}
        message={confirmationMessage}
        title={confirmationTitle}
      />
    </>
  );
};
