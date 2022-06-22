import { FC } from 'react';
import { StoreState } from 'src/store';
import { Dispatch } from 'redux';
import { togglePublic } from 'store/profile/actions';
import { connect } from 'react-redux';

interface AboutProps {
  name: string;
  isPublic: boolean;
  toggle: () => void;
}

export const About: FC<AboutProps> = (props) => {
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
          onChange={() => props.toggle()}
        />
      </p>
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  name: state.profile.user.name,
  isPublic: state.profile.isPublic,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggle: () => dispatch(togglePublic()),
});

export const AboutWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
