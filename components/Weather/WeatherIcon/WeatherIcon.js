const weatherIcon = props => {
  let icon = null;
  if (props.condition) {
    icon = <img src={`/static/weatherIcons/${props.condition}.svg`} alt={props.condition} />;
  }

  return <React.Fragment>{icon}</React.Fragment>;
};

export default weatherIcon;
