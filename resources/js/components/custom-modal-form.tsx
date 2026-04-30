import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { hasPermission } from "@/utils/authorization"
import InputError from "./input-error"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ChangeEvent } from "react"
import permissions from "@/routes/permissions"
import { usePage } from "@inertiajs/react"
import { Value } from "@radix-ui/react-select"
import { X } from 'lucide-react';

interface AddButtonProps {
  id: string;
  label: string;
  className: string;
  icon: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  variant: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | undefined;
  permission?: string;
}

interface FieldProps {
  id: string;
  key: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  autocomplete?: string;
  tabIndex: number;
  autoFocus?: boolean;
  rows?: number;
  accept?: string;
  className?: string;
  options?: { label: string, value: string, key: string }[];
}

interface ButtonProps {
    key: string;
    type: 'button' | 'submit' | 'reset' | undefined;
    label: string;
    variant: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | undefined;
    className: string;
}

interface Permissions {
  id: number;
  label: string;
  name: string;
  module: string;
  description: string;
}

interface FieldOption {
  key: string;
  label: string;
  value: string;
}

interface ExtraData {
  [module: string]: Permissions[];
}

interface CustomModalFormProps {
  addButton: AddButtonProps;
  title: string;
  search_label: string;
  description: string;
  fields: FieldProps[];
  buttons: ButtonProps[];
  data: Record<string, any>;
  setData: (name: string, value: any) => void;
  errors: Record<string, string>;
  processing: boolean;
  handleSubmit: (data: any) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'view' | 'edit';
  setPreviewImage?: string |  null;
  extraData?: ExtraData;
  handleSearch: (e: ChangeEvent) => void;
  handleReset: () => void;
}

export const CustomModalForm = ({ 
  addButton, 
  title, 
  search_label,
  description, 
  fields, 
  buttons, 
  data, 
  setData, 
  errors,
  processing, 
  handleSubmit,
  open,
  onOpenChange,
  mode='create',
  setPreviewImage,
  extraData,
  handleSearch,
  handleReset,
}: CustomModalFormProps) => {  
    const { auth } = usePage().props as any;
    const roles = auth.roles;
    const permissions = auth.permissions;
    
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
        

      <form>

        <div className="flex justify-between ml-auto px-2">
          <div className="flex w-full gap-2">
              <Input type="text" value={data.search} onChange={handleSearch} className="h-10 w-1/2" placeholder={search_label ? search_label : 'Search...'} name="search"/>
              <Button onClick={handleReset} className='h-10 cursor-pointer bg-red-600 hover:bg-red-500'>
                  <X size={20} />
              </Button>
          </div>

            {addButton.permission && hasPermission(permissions, addButton.permission) && (
              <DialogTrigger asChild>
                <Button type={addButton.type} id={addButton.id} variant={addButton.variant} className={addButton.className}>
                  {addButton.icon && <addButton.icon/>} {addButton.label}
                </Button>
              </DialogTrigger>
            )} 
          </div>

        {/* dialog content */}
        <DialogContent onInteractOutside={(e) => e.preventDefault()} className="sm:max-w-[830px] max-h-screen overflow-scroll">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription> {description}</DialogDescription>
          </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
            <FieldGroup>
                <div className="grid gap-6">
                    {fields.map((field) => {

                      const isHiddenPassword = field.type === 'password' && mode !== 'create';

                      if (isHiddenPassword) return null;
                      
                      return (
                      <div  key={field.key} className="grid gap-2">
                        <Label htmlFor={field.id}>{field.label}</Label>

                        { field.type === 'textarea' ? (
                          <textarea
                            id={field.id}
                            name={field.name}
                            placeholder={field.placeholder}
                            rows={field.rows}
                            autoComplete={field.autocomplete}
                            tabIndex={field.tabIndex}
                            className={field.className}
                            onChange={(e) => setData(field.name, e.target.value)}
                            value={data[field.name] || ''}
                            disabled={processing || mode === 'view'}
                            />
                        ) : field.type === 'file' ? (
                          <div className="space-y-2">
                            {/* image preview only */}
                            { mode !== 'create' && setPreviewImage && (
                              <img src={setPreviewImage} alt={data?.[field.key]} className="h-32 w-32 rounded object-cover" />
                            )}
                            {/* file input */}
                            { mode !== 'view' && (
                                <Input 
                                id={field.id}
                                name={field.name}
                                type='file'
                                placeholder={field.placeholder}
                                autoComplete={field.autocomplete}
                                tabIndex={field.tabIndex}
                                onChange={(e) => setData(field.name, e.target.files ? e.target.files[0]: null)}
                                disabled={processing}
                              />
                            )}
                          </div>
                          
                        ): field.type === 'single-select' ? (
                            <Select disabled={processing || mode === 'view'} value={data[field.name] || ''} 
                                onValueChange={(value) => setData(field.name, value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder={`Select ${field.label}`}></SelectValue>
                                </SelectTrigger>

                                <SelectContent>
                                  {(field.options?.length 
                                    ? field.options 
                                    : (extraData?.[field.key] || []).map((item: any) => ({
                                      key: item.id,
                                      value: item.name,
                                      label: item.label,
                                  })))?.map((option: FieldOption) => (
                                    <SelectItem key={option.key} value={String(option.value)}>
                                      {option.label} 
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                            </Select>
                        ): field.type === 'single-select2' ? (
                          <Select disabled={processing || mode === 'view'}
                              value={data[field.name]}
                              onValueChange={(value) => setData(field.name, value) }>

                            <SelectTrigger>
                              <SelectValue placeholder={`Select ${field.name}`} />
                            </SelectTrigger>

                            <SelectContent>
                              {(extraData?.groups || []).map((item: any) => ({
                                  key: item.id,
                                  value: item.name,
                                  label: item.label,
                              }))?.map((option: FieldOption) => (
                                  <SelectItem key={option.key} value={String(option.value)}>
                                    {option.label} 
                                  </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ): field.type === 'grouped-checkboxes' ? (
                          <div className="space-y-2">
                            {extraData && Object.entries(extraData).map(([module, permissions]) => (
                                <div key={module} className="mb-4 border-b pb-5">
                                    <h4 className="capitalize texts-sm font-bold text-gray-700 ">{module}</h4>
                                    <div className="ms-4 mt-2 grid grid-cols-3 gap-2">
                                        {permissions.map((permission) => (
                                          <label key={permission.id} className='flex items-center gap-2'>
                                            <input 
                                            type='checkbox' 
                                            name={field.name}
                                            disabled={processing || mode === 'view'}
                                            value={permission.name}
                                            checked={data.permissions.includes(permission.name)}
                                            onChange={(e) => {
                                              const value = permission.name;
                                              const current = data.permissions || [];

                                              if (e.target.checked) {
                                                setData('permissions', [...current, value]);
                                              } else {
                                                setData('permissions', current.filter((permision: string) => permision !== value));
                                              }
                                            }}
                                            />
                                            <span>{permission.label}</span>
                                          </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                          </div>
                            
                        ) : (
                          <Input 
                              id={field.id}
                              name={field.name}
                              placeholder={field.placeholder}
                              autoComplete={field.autocomplete}
                              tabIndex={field.tabIndex}
                              onChange={(e) => setData(field.name, e.target.value)}
                              value={data[field.name] || ''}
                              disabled={processing || mode === 'view'}
                            />
                          )}

                        {/* form validation error */}
                        <InputError message={errors?.[field.name]} />
                      </div>
                      );
                    })}
                  
                </div>
            </FieldGroup>

          
            <DialogFooter>

              {buttons.map((button) => {
                  if (button.key === 'cancel') {
                    return (
                      <DialogClose asChild key={button.key} >
                        <Button 
                          key={button.key} 
                          variant={button.variant}
                          type={button.type}
                          >{button.label}</Button>
                      </DialogClose>

                    )
                  } else if (mode !== 'view') {
                    return (
                      <Button
                        key={button.key}
                        type={button.type}
                        variant={button.variant}
                        className={button.className}
                      >
                        {button.label}
                      </Button>
                    )
                  }
                }
              )}
            
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  )
}
