import { FC, useEffect } from 'react';
import { StoreState } from 'src/store';
import { connect, useDispatch } from 'react-redux';
import {
  initProfileTracking,
  setIsPublicWithFirebase,
} from 'store/profile/slice';

interface AboutProps {
  name: string;
  isPublic: boolean;
  toggle: (isPublic: boolean) => void;
}

export const About: FC<AboutProps> = (props) => {
  const dispatch = useDispatch() as any;

  useEffect(() => {
    dispatch(initProfileTracking());
  }, []);

  return (
    <>
      <h2>About page</h2>
      <p>{props.name}</p>
      <label htmlFor={'isPublic'}>
        Is profile public? — {props.isPublic ? 'Yes' : 'No'}
      </label>
      <p>
        <input
          id={'isPublic'}
          type="checkbox"
          checked={props.isPublic}
          onChange={() => props.toggle(!props.isPublic)}
        />
      </p>
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  name: state.profile.user.name,
  isPublic: state.profile.isPublic,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggle: (isPublic: boolean) => dispatch(setIsPublicWithFirebase(isPublic)),
});

export const AboutWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
