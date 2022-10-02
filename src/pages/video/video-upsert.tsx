// Packages
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Components
import { ControllerTextField } from '../../components/text-field';
import { ControllerSelectField } from '../../components/select-field';
import { ControllerMultiSelectField } from '../../components/multi-select-field';
import { PageHeader } from './../../components/page-header';
import { Button } from './../../components/button';

// Services
import { getCategories } from './../../services/videos/categories';
import { getAuthors } from './../../services/videos/authors';
import { createVideo, getVideoById } from '../../services/videos/videos';

// Interfaces
import { Category, Video } from './../../common/interfaces';

// Routes
import { routeConstantsService } from '../../services/routes';
import { getCategoryName } from './../../utils/getCategoryName';
import { formatDate } from './../../utils/formatDate';
import { toast } from 'react-toastify';

// MUI Stylings
const FormParentStyling = {
  p: 2,
  margin: 'auto',
  my: '50px',
  width: 1 / 2,
  flexGrow: 1,
  backgroundColor: '#fff',
};

const FormStyling = {
  display: 'grid',
  columnGap: 3,
  rowGap: 1,
  gridTemplateColumns: 'repeat(1, 1fr)',
};

const EventStyling = {
  display: 'grid',
  columnGap: 3,
  rowGap: 1,
  gridTemplateColumns: 'repeat(2, 1fr)',
  mx: 5,
  my: 2,
};

// Form Validation Schema if it gets bigger we can move it to separate validation file
const schema = yup
  .object({
    author: yup.object().required('Author is required').nullable(true),
    videos: yup.object({
      name: yup.string().required('Name is required'),
      catIds: yup.array().min(1, 'Category is required'),
    }),
  })
  .required();

export const UpsertVideo = () => {
  // React Hook Form Intialization
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // form validation schema applied here
    mode: 'all',
    defaultValues: {
      author: null,
      videos: {
        name: '',
        formats: {
          one: { res: '1080p', size: 1000 },
        },
        releaseDate: formatDate(new Date()),
        catIds: [],
      },
    },
  });
  // Hooks
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState<any>(null);

  const params = useParams();
  const location = useLocation();

  // Video Id
  const { id } = params;
  const authorId = location?.state?.authorId;

  // Navigation
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(setCategories);
    getAuthors().then(setAuthors);
  }, []);

  const getVideoByAuthorId = useCallback(async () => {
    // getting videos by author id
    const videoById: any = await getVideoById(authorId);

    // filtering videos by video id
    const video: any = (videoById as any).videos.filter((video: Video) => {
      return video.id === Number(id);
    });

    // getting categories with name
    const categoriesWithName: (string | Category)[] = getCategoryName(categories, video[0].catIds, true);

    // updating keys as per the react select requirement
    const manipulateCategoriesWithName = categoriesWithName.map((category: any) => {
      return { label: category?.name, value: category?.id } as any;
    });
    // setting values in react hook form
    setValue('author', videoById);
    setValue('videos.name', video[0].name);
    setValue('videos.catIds', (categoriesWithName.length > 0 && categoriesWithName) as []);
    setSelectedAuthor({ value: videoById.id, label: videoById.name, videos: videoById.videos } as any);
    setSelectedCategories(manipulateCategoriesWithName);
  }, [authorId, categories, id, setValue]);

  // get video by author id if edit record
  useEffect(() => {
    if (id) {
      getVideoByAuthorId();
    }
  }, [id, getVideoByAuthorId]);

  // getting cat ids from cat objects
  const getCatIds = (data: any) => {
    return data.videos.catIds.map((catId: any) => (catId.id ? catId.id : catId.value));
  };

  // removing exsting video to replace it with the updated one
  const removeExistingVideo = (data: any) => {
    return data.author.videos.filter((video: any) => {
      return video.id !== Number(id);
    });
  };

  // onSubmit
  const submitHandler = (data: any) => {
    try {
      let existingVideos = [];

      data.videos.catIds = getCatIds(data);
      if (id) {
        data.videos.id = Number(id);
        existingVideos = removeExistingVideo(data);
      } else {
        data.videos.id = uuidv4();
        existingVideos = data.author.videos;
      }

      // prepared the final obj as per db json requirement
      const authorObj = {
        id: data.author.id ? data.author.id : data.author.value,
        name: data.author.name ? data.author.name : data.author.label,
        videos: [...existingVideos, data.videos],
      };
      // api call
      createVideo(authorObj.id, authorObj);

      // We can move it to the general axios function where we can check on the basis of http code
      if (id) {
        toast.success('Video Updated Successfully');
      } else {
        toast.success('Video Added Successfully');
      }
      // navigates to list page
      navigate(routeConstantsService.unAuthenticatedRoutes.videos.path);
    } catch (error) {
      console.log(error);
    }
  };

  // Redirects to list page
  const gotoList = () => {
    reset();
    navigate(routeConstantsService.unAuthenticatedRoutes.videos.path);
  };
  return (
    <Paper sx={FormParentStyling}>
      <PageHeader title={'Add Video'} />

      <form onSubmit={handleSubmit(submitHandler)}>
        <Box sx={FormStyling}>
          {/* Input text field controller */}
          <ControllerTextField name="videos.name" label="Name" control={control} />
          {errors?.videos?.name?.message && (
            <div className="error">
              <div>
                <span>{errors?.videos?.name?.message}*</span>
              </div>
            </div>
          )}
          {/* Single Select field controller */}
          <ControllerSelectField
            name="author"
            label="Author"
            control={control}
            items={authors as []}
            valueById={selectedAuthor}
            setValue={setValue}
          />
          {errors?.author?.message && (
            <div className="error">
              <div>
                <span>{errors?.author?.message}*</span>
              </div>
            </div>
          )}
          {/* Multi Select field controller */}
          <ControllerMultiSelectField
            name="videos.catIds"
            label="Category"
            control={control}
            items={categories as []}
            valueById={selectedCategories}
            setValue={setValue}
          />
          {errors?.videos?.catIds?.message && (
            <div className="error">
              <div>
                <span>{errors?.videos?.catIds?.message}*</span>
              </div>
            </div>
          )}
        </Box>
        <Box sx={EventStyling}>
          <Button primary>Submit</Button>
          <Button secondary onClick={gotoList}>
            Cancel
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
