// Packages
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { PageHeader } from '../../components/page-header';

// Interfaces
import { ProcessedVideo } from '../../common/interfaces';

// Services
import { getVideos } from '../../services/videos/videos';
import { routeConstantsService } from './../../services/routes/constants';
import { VideoTable } from '../../components/video-table';

export const Videos = () => {
  // Hooks
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const navigate = useNavigate();

  // Calls api from server
  useEffect(() => {
    getVideos().then(setVideos);
  }, []);

  // Redirects to add video page
  const handleAddVideo = () => {
    navigate(routeConstantsService.unAuthenticatedRoutes.createVideo.path);
  };

  return (
    <>
      {/* Page Title  */}
      <PageHeader title={'Ahmed Faraz Frontend Challenge'} handler={handleAddVideo} buttonText={'Add Video'} />

      {/* Videos Table */}
      <VideoTable videos={videos} setVideos={setVideos} />
    </>
  );
};
