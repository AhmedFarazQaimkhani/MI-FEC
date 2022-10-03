// Packages
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Components
import { Table } from '../../components/table/table';
import { Button } from '../../components/button/button';

// Services
import { routeConstantsService } from './../../services/routes/constants';

// Interfaces
import { Column, ProcessedVideo } from '../../common/interfaces';
import { ConfirmationDialog } from '../dialog/confirm-dialog';
import { SearchInput } from '../search/search-input';

type VideosTableProps = {
  videos: ProcessedVideo[];
  setVideos: any;
};

export const VideoTable = ({ videos, setVideos }: VideosTableProps) => {
  // Hooks
  const [videoId, setVideoId] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<ProcessedVideo[]>([]);

  const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  // Confirmation dialog text
  const confirmationMessage = 'Do you really want to delete it?';
  const confirmationTitle = 'Delete';

  /**
   * No functionilty provided by json-server to delete nested data
   * So I applied delete manually on state to show delete operation
   */

  // Confirmation diaglog when user try to delete a video
  const openConfirmDialog = (id: number) => {
    setVideoId(id);
    setShowConfirmationDialog(!showConfirmationDialog);
  };
  // Delete video softly
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

  /**
   * Handle search use to search across all columns. We can make it better using vanilla js approach by using table row and td.
   * It can be create as a custom hook
   */
  const handleSearch = () => {
    let filteredData = videos.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        value.author.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        value.categories.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        value.formats.res.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        value.releaseDate.toString().toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredData(filteredData as any);
  };

  return (
    <>
      {/* Search Input */}
      <SearchInput setSearchValue={setSearchValue} handleSearch={handleSearch} />
      {/* Custom Table to render videos */}
      <Table data={filteredData.length > 0 ? filteredData : videos} columns={columns} />
      {/* Confirm on delete video */}
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
