import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Chip } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { RootState } from '../../store';
import { updateLoad } from '../../store/tmsSlice';
import { LoadStatus } from '../../types';

const columns: { id: LoadStatus; title: string; color: string }[] = [
  { id: 'posted', title: 'Posted', color: '#1565c0' },
  { id: 'dispatched', title: 'Dispatched', color: '#e65100' },
  { id: 'picked_up', title: 'Picked Up', color: '#7b1fa2' },
  { id: 'in_transit', title: 'In Transit', color: '#2e7d32' },
  { id: 'delivered', title: 'Delivered', color: '#00695c' },
];

const DispatchBoard: React.FC = () => {
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();
  const loads = useSelector((state: RootState) => state.tms.loads);
  const drivers = useSelector((state: RootState) => state.tms.drivers);

  const getDriverName = (driverId: string | null) => {
    if (!driverId) return 'Unassigned';
    return drivers.find(d => d.id === driverId)?.fullName || 'Unknown';
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const loadId = result.draggableId;
    const newStatus = result.destination.droppableId as LoadStatus;
    const load = loads.find(l => l.id === loadId);

    if (load && load.status !== newStatus) {
      reduxDispatch(updateLoad({ ...load, status: newStatus }));
    }
  };

  return (
    <Box>
      <div className="tms-page-header">
        <div>
          <h1 className="tms-page-title">Dispatch Board</h1>
          <p className="tms-page-subtitle">Drag loads between columns to update status</p>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="tms-dispatch-board">
          {columns.map(column => {
            const columnLoads = loads.filter(l => l.status === column.id);
            return (
              <div key={column.id} className="tms-dispatch-column">
                <div className="tms-dispatch-column-header">
                  <span style={{ color: column.color }}>{column.title}</span>
                  <span className="tms-dispatch-column-count">{columnLoads.length}</span>
                </div>
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="tms-dispatch-column-body"
                      style={{
                        backgroundColor: snapshot.isDraggingOver ? '#e8f5e9' : undefined,
                        transition: 'background-color 0.2s',
                      }}
                    >
                      {columnLoads.map((load, index) => (
                        <Draggable key={load.id} draggableId={load.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`tms-dispatch-card ${snapshot.isDragging ? 'tms-dispatch-card-dragging' : ''}`}
                              onDoubleClick={() => navigate(`/loads/${load.id}`)}
                            >
                              <div className="tms-dispatch-card-header">
                                <span className="tms-dispatch-card-load">{load.loadNumber}</span>
                                <span className="tms-dispatch-card-rate">${load.rate.toLocaleString()}</span>
                              </div>
                              <div className="tms-dispatch-card-route">
                                {load.origin.city}, {load.origin.state} → {load.destination.city}, {load.destination.state}
                              </div>
                              <div className="tms-dispatch-card-info">
                                <Chip
                                  label={getDriverName(load.driverId)}
                                  size="small"
                                  sx={{
                                    fontSize: 11,
                                    height: 22,
                                    bgcolor: load.driverId ? '#e8f5e9' : '#fff3e0',
                                    color: load.driverId ? '#2e7d32' : '#e65100',
                                  }}
                                />
                                <span>{load.miles} mi</span>
                              </div>
                              <div style={{ marginTop: 6, fontSize: 11, color: '#999' }}>
                                {load.equipmentType} · {load.weight.toLocaleString()} lbs
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {columnLoads.length === 0 && (
                        <Typography
                          variant="caption"
                          sx={{ display: 'block', textAlign: 'center', color: '#aaa', py: 4 }}
                        >
                          No loads
                        </Typography>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </Box>
  );
};

export default DispatchBoard;
