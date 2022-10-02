// Packages
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { VideosTable } from '../../components/videos-table';
import { PageHeader } from '../../components/page-header';

// Interfaces
import { ProcessedVideo } from '../../common/interfaces';

// Services
import { getVideos } from '../../services/videos/videos';
import { routeConstantsService } from './../../services/routes/constants';

export const Videos = () => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getVideos().then(setVideos);
  }, []);

  const handleAddVideo = () => {
    navigate(routeConstantsService.unAuthenticatedRoutes.createVideo.path);
  };

  return (
    <>
      <PageHeader title={'Ahmed Faraz Frontend Challenge'} handler={handleAddVideo} buttonText={'Add Video'} />
      <VideosTable videos={videos} setVideos={setVideos} />
    </>
  );
};
