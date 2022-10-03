// Components
import { getPropByString } from '../../utils/getPropByString';

export const TableBody = ({ tableData, columns }: any) => {
  return (
    <tbody>
      {tableData.map((data: any) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor, renderCell }: any) => {
              const tData = getPropByString(data, accessor);
              return (
                <td key={accessor}>
                  {/* this displays default data */}
                  {accessor && !renderCell && tData}

                  {/* this displays custom data */}
                  {accessor && renderCell && renderCell(data)}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
