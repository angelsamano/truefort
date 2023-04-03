import { ReactComponent as Logo } from '@images/logo.svg';
import { ReactComponent as Add } from '@images/add.svg';
import { ReactComponent as Edit } from '@images/edit.svg';
import { ReactComponent as Refresh } from '@images/refresh.svg';
import { ReactComponent as Delete } from '@images/delete.svg';
import { ReactComponent as Export } from '@images/export.svg';

const IconButton = ({ onClick = () => {}, icon = 'missing', className = 'w-10 h-10', tooltip = '', disabled = false }) => {
  const Icons = {
    logo: <Logo />,
    add: <Add />,
    edit: <Edit />,
    refresh: <Refresh />,
    delete: <Delete />,
    export: <Export />,
  };

  return (
    <button name={icon} onClick={onClick} type="button" className={className} title={tooltip} disabled={disabled}>
      { Icons[icon] }
    </button>
  );
};

export default IconButton;
